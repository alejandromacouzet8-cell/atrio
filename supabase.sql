-- Atrio: veladoras del día (anónimas) y avance de cada persona con cuenta
create table if not exists public.velas (
  id bigint generated always as identity primary key,
  dia date not null,
  estado smallint not null check (estado between 0 and 31),
  creado timestamptz not null default now()
);
create index if not exists velas_dia on public.velas (dia);
alter table public.velas enable row level security;
drop policy if exists "velas leer" on public.velas;
create policy "velas leer" on public.velas for select to anon, authenticated using (dia >= current_date - 2);
drop policy if exists "velas encender" on public.velas;
create policy "velas encender" on public.velas for insert to anon, authenticated
  with check (dia between current_date - 1 and current_date + 1);
grant select, insert on public.velas to anon, authenticated;

create table if not exists public.progreso (
  user_id uuid primary key references auth.users (id) on delete cascade,
  datos jsonb not null default '{}'::jsonb,
  actualizado timestamptz not null default now()
);
alter table public.progreso enable row level security;
drop policy if exists "progreso propio leer" on public.progreso;
create policy "progreso propio leer" on public.progreso for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "progreso propio crear" on public.progreso;
create policy "progreso propio crear" on public.progreso for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "progreso propio cambiar" on public.progreso;
create policy "progreso propio cambiar" on public.progreso for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
revoke all on public.progreso from anon;
grant select, insert, update on public.progreso to authenticated;

-- Cuenta de veladoras por estado para un día (respeta las reglas de lectura de la tabla)
create or replace function public.velas_del_dia(d date)
returns table (estado smallint, n integer)
language sql stable
set search_path = ''
as $$ select v.estado, count(*)::integer from public.velas v where v.dia = d group by v.estado $$;
grant execute on function public.velas_del_dia(date) to anon, authenticated;
-- Nadie cambia ni borra veladoras ni avances desde la app
revoke update, delete, truncate on public.velas from anon, authenticated;
revoke delete, truncate on public.progreso from authenticated;
select 'listo' as atrio;

-- Rosario juntos: un grupo (pareja o familia) reza el rosario de cada día por misterios, cada quien a su hora.
-- Sin cuentas: quien tiene la liga (un identificador imposible de adivinar) puede ver y marcar.
create table if not exists public.juntos (
  id uuid primary key default gen_random_uuid(),
  creador text not null check (char_length(creador) between 1 and 40),
  intencion text check (char_length(intencion) <= 140),
  creado timestamptz not null default now()
);
create table if not exists public.juntos_cuentas (
  junto uuid not null references public.juntos(id) on delete cascade,
  dia date not null,
  m smallint not null check (m between 0 and 4),
  quien text not null check (char_length(quien) between 1 and 40),
  hecho timestamptz not null default now(),
  primary key (junto, dia, m)
);
alter table public.juntos enable row level security;
alter table public.juntos_cuentas enable row level security;
revoke all on public.juntos, public.juntos_cuentas from anon, authenticated;

create or replace function public.juntos_ver(j uuid, d date) returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'creador', g.creador, 'intencion', g.intencion,
    'cuentas', coalesce((select json_agg(json_build_object('m', c.m, 'quien', c.quien, 'hecho', c.hecho) order by c.m) from juntos_cuentas c where c.junto = g.id and c.dia = d), '[]'::json),
    'completos', coalesce((select json_agg(x.dia order by x.dia desc) from (select c.dia from juntos_cuentas c where c.junto = g.id and c.dia > d - 120 group by c.dia having count(*) = 5) x), '[]'::json),
    'gente', coalesce((select json_agg(distinct c.quien) from juntos_cuentas c where c.junto = g.id and c.dia > d - 30), '[]'::json))
  from juntos g where g.id = j;
$$;

create or replace function public.juntos_crear(c text, i text) returns uuid
language plpgsql volatile security definer set search_path = public as $$
declare r uuid;
begin
  insert into juntos(creador, intencion) values (left(trim(c), 40), nullif(left(trim(coalesce(i, '')), 140), '')) returning id into r;
  return r;
end $$;

create or replace function public.juntos_marca(j uuid, d date, m int, q text) returns json
language plpgsql volatile security definer set search_path = public as $$
begin
  if d < current_date - 1 or d > current_date + 1 then raise exception 'dia fuera de rango'; end if;
  if not exists (select 1 from juntos where id = j) then raise exception 'no existe'; end if;
  insert into juntos_cuentas(junto, dia, m, quien) values (j, d, m, left(trim(q), 40)) on conflict do nothing;
  return juntos_ver(j, d);
end $$;

create or replace function public.juntos_intencion(j uuid, i text) returns void
language sql volatile security definer set search_path = public as $$
  update juntos set intencion = nullif(left(trim(coalesce(i, '')), 140), '') where id = j;
$$;

revoke all on function public.juntos_ver(uuid, date), public.juntos_crear(text, text), public.juntos_marca(uuid, date, int, text), public.juntos_intencion(uuid, text) from public;
grant execute on function public.juntos_ver(uuid, date), public.juntos_crear(text, text), public.juntos_marca(uuid, date, int, text), public.juntos_intencion(uuid, text) to anon, authenticated;

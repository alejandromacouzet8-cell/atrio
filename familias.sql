-- Rosario en familia: un grupo con una intención. Lo que reza cada quien se suma al de toda la familia.
-- Sin cuenta obligatoria: quien tiene la liga (un identificador imposible de adivinar) puede ver y sumar.
-- Nadie lee ni escribe las tablas directo: todo pasa por las funciones de abajo.
-- "miembro" es la llave privada de cada teléfono (o de cada cuenta): nunca se devuelve a los demás.

create table if not exists public.familias (
  id text primary key check (id ~ '^[a-km-np-z2-9]{10}$'),
  nombre text not null check (char_length(nombre) between 1 and 40),
  intencion text check (char_length(intencion) <= 140),
  creador uuid not null,
  creador_n text not null check (char_length(creador_n) between 1 and 24),
  dia0 date not null,
  creada timestamptz not null default now()
);
create table if not exists public.familia_miembros (
  familia text not null references public.familias(id) on delete cascade,
  miembro uuid not null,
  nombre text not null check (char_length(nombre) between 1 and 24),
  unido timestamptz not null default now(),
  visto timestamptz,
  estado smallint not null default 0 check (estado between 0 and 2),
  primary key (familia, miembro)
);
create table if not exists public.familia_rezos (
  familia text not null,
  miembro uuid not null,
  sesion uuid not null,
  dia date not null,
  mis smallint not null default 0 check (mis between 0 and 5),
  aves smallint not null default 0 check (aves between 0 and 60),
  completo boolean not null default false,
  hecho timestamptz not null default now(),
  primary key (familia, miembro, sesion),
  foreign key (familia, miembro) references public.familia_miembros(familia, miembro) on delete cascade
);
create index if not exists familia_rezos_dia on public.familia_rezos (familia, dia);
create index if not exists familias_creada on public.familias (creada);
create index if not exists familias_creador on public.familias (creador);
alter table public.familias enable row level security;
alter table public.familia_miembros enable row level security;
alter table public.familia_rezos enable row level security;
revoke all on public.familias, public.familia_miembros, public.familia_rezos from anon, authenticated;

-- Lo que ve quien tiene la liga: el nombre, la intención, lo rezado entre todos y quién ha rezado.
create or replace function public.fam_ver(f text, d date, mi uuid default null) returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'id', g.id, 'nombre', g.nombre, 'intencion', g.intencion, 'creador', g.creador_n,
    'mia', coalesce(g.creador = mi, false),
    'dias', greatest(1, coalesce(d, current_date) - g.dia0 + 1),
    'rosarios', t.ros, 'misterios', t.mis, 'aves', t.aves, 'rezados', t.dr,
    'hoy', json_build_object('rosarios', t.rosh, 'misterios', t.mish, 'aves', t.avesh),
    'gente', (select count(*) from familia_miembros k where k.familia = g.id),
    'miembros', coalesce((
      select json_agg(json_build_object('n', x.nombre, 'yo', x.yo, 'ros', x.ros, 'mis', x.mis, 'aves', x.aves, 'hoy', x.hoy, 'est', x.est, 'ult', x.ult) order by x.aves desc, x.unido)
      from (
        select m.nombre, coalesce(m.miembro = mi, false) as yo, m.unido,
          coalesce(s.ros, 0) as ros, coalesce(s.mis, 0) as mis, coalesce(s.aves, 0) as aves, coalesce(s.hoy, 0) as hoy, s.ult,
          case when m.visto > now() - interval '75 seconds' then m.estado else 0 end as est
        from familia_miembros m
        left join lateral (
          select count(*) filter (where r.completo) as ros, sum(r.mis) as mis, sum(r.aves) as aves,
            sum(r.mis) filter (where r.dia = coalesce(d, current_date)) as hoy, max(r.hecho) as ult
          from familia_rezos r where r.familia = m.familia and r.miembro = m.miembro
        ) s on true
        where m.familia = g.id
        order by coalesce(s.aves, 0) desc, m.unido
        limit 80
      ) x), '[]'::json),
    'reciente', coalesce((
      select json_agg(json_build_object('n', y.nombre, 'mis', y.mis, 'c', y.completo, 'h', y.hecho) order by y.hecho desc)
      from (
        select m.nombre, r.mis, r.completo, r.hecho
        from familia_rezos r join familia_miembros m on m.familia = r.familia and m.miembro = r.miembro
        where r.familia = g.id and r.mis > 0
        order by r.hecho desc limit 8
      ) y), '[]'::json)
  )
  from familias g
  cross join lateral (
    select count(*) filter (where r.completo) as ros, coalesce(sum(r.mis), 0) as mis, coalesce(sum(r.aves), 0) as aves, count(distinct r.dia) as dr,
      count(*) filter (where r.completo and r.dia = coalesce(d, current_date)) as rosh,
      coalesce(sum(r.mis) filter (where r.dia = coalesce(d, current_date)), 0) as mish,
      coalesce(sum(r.aves) filter (where r.dia = coalesce(d, current_date)), 0) as avesh
    from familia_rezos r where r.familia = g.id
  ) t
  where g.id = f;
$$;

-- Crear la familia. El identificador lo trae el teléfono, así puede compartir la liga al instante;
-- repetir la llamada no crea otra.
create or replace function public.fam_crear(f text, n text, i text, mi uuid, q text, d date) returns json
language plpgsql volatile security definer set search_path = public as $$
declare
  nn text := left(nullif(trim(regexp_replace(coalesce(n, ''), '\s+', ' ', 'g')), ''), 40);
  ii text := nullif(left(trim(regexp_replace(coalesce(i, ''), '\s+', ' ', 'g')), 140), '');
  qq text := left(coalesce(nullif(trim(regexp_replace(coalesce(q, ''), '\s+', ' ', 'g')), ''), 'Alguien'), 24);
  dueno uuid;
begin
  if f is null or f !~ '^[a-km-np-z2-9]{10}$' or mi is null then raise exception 'datos'; end if;
  if d is null or d < current_date - 1 or d > current_date + 1 then d := current_date; end if;
  select creador into dueno from familias where id = f;
  if found then
    if dueno <> mi then raise exception 'ocupado'; end if;
  else
    if (select count(*) from familias where creador = mi and creada > now() - interval '1 day') >= 8 then raise exception 'muchas'; end if;
    if (select count(*) from familias where creada > now() - interval '1 day') >= 5000 then raise exception 'muchas'; end if;
    insert into familias(id, nombre, intencion, creador, creador_n, dia0) values (f, coalesce(nn, 'Familia de ' || qq), ii, mi, qq, d);
  end if;
  insert into familia_miembros(familia, miembro, nombre, visto, estado) values (f, mi, qq, now(), 1)
    on conflict (familia, miembro) do update set nombre = excluded.nombre, visto = now(), estado = 1;
  return fam_ver(f, d, mi);
end $$;

-- Entrar (o avisar que sigo aquí). e: 0 me fui, 1 estoy en la sala, 2 estoy rezando.
create or replace function public.fam_entra(f text, mi uuid, n text, e int, d date) returns json
language plpgsql volatile security definer set search_path = public as $$
declare
  qq text := left(nullif(trim(regexp_replace(coalesce(n, ''), '\s+', ' ', 'g')), ''), 24);
  ee smallint := greatest(0, least(2, coalesce(e, 1)));
begin
  if mi is not null and qq is not null and exists (select 1 from familias where id = f) then
    if exists (select 1 from familia_miembros where familia = f and miembro = mi) then
      update familia_miembros set nombre = qq, visto = now(), estado = ee where familia = f and miembro = mi;
    elsif (select count(*) from familia_miembros where familia = f) < 300 then
      insert into familia_miembros(familia, miembro, nombre, visto, estado) values (f, mi, qq, now(), ee) on conflict do nothing;
    end if;
  end if;
  return fam_ver(f, coalesce(d, current_date), mi);
end $$;

-- Sumar lo rezado. Cada rosario que alguien empieza es una sesión; se puede mandar varias veces
-- (al terminar cada misterio y al final) y nunca cuenta doble: se queda el avance más alto.
create or replace function public.fam_reza(f text, mi uuid, n text, d date, s uuid, ms int, av int, c boolean) returns json
language plpgsql volatile security definer set search_path = public as $$
declare
  qq text := left(coalesce(nullif(trim(regexp_replace(coalesce(n, ''), '\s+', ' ', 'g')), ''), 'Alguien'), 24);
begin
  if f is null or mi is null or s is null or d is null then raise exception 'datos'; end if;
  if d < current_date - 8 or d > current_date + 1 then raise exception 'dia fuera de rango'; end if;
  if not exists (select 1 from familias where id = f) then raise exception 'no existe'; end if;
  ms := greatest(0, least(5, coalesce(ms, 0)));
  -- en un rosario hay 53 Ave Marías; con misterios a medias no puede haber más que las de esos misterios, uno empezado y las tres del inicio
  av := greatest(0, least(53, ms * 10 + 12, coalesce(av, 0)));
  c := coalesce(c, false) and ms = 5;
  if not exists (select 1 from familia_miembros where familia = f and miembro = mi) then
    if (select count(*) from familia_miembros where familia = f) >= 300 then raise exception 'llena'; end if;
    insert into familia_miembros(familia, miembro, nombre) values (f, mi, qq) on conflict do nothing;
  end if;
  if not exists (select 1 from familia_rezos where familia = f and miembro = mi and sesion = s)
     and (select count(*) from familia_rezos where familia = f and miembro = mi and dia = d) >= 24 then
    raise exception 'muchos';
  end if;
  insert into familia_rezos(familia, miembro, sesion, dia, mis, aves, completo) values (f, mi, s, d, ms, av, c)
    on conflict (familia, miembro, sesion) do update
      set mis = greatest(familia_rezos.mis, excluded.mis), aves = greatest(familia_rezos.aves, excluded.aves),
          completo = familia_rezos.completo or excluded.completo, hecho = now();
  return fam_ver(f, d, mi);
end $$;

-- Solo quien la creó cambia el nombre o la intención.
create or replace function public.fam_edita(f text, mi uuid, n text, i text, d date) returns json
language plpgsql volatile security definer set search_path = public as $$
declare
  nn text := left(nullif(trim(regexp_replace(coalesce(n, ''), '\s+', ' ', 'g')), ''), 40);
  ii text := nullif(left(trim(regexp_replace(coalesce(i, ''), '\s+', ' ', 'g')), 140), '');
begin
  update familias set nombre = coalesce(nn, nombre), intencion = ii where id = f and creador = mi;
  if not found then raise exception 'no'; end if;
  return fam_ver(f, coalesce(d, current_date), mi);
end $$;

-- Quien rezó sin cuenta y luego entra a su cuenta: lo de este teléfono pasa a su llave de siempre.
-- Hay que conocer las dos llaves, y eso solo lo sabe su dueño.
create or replace function public.fam_une(f text, de uuid, a uuid) returns void
language plpgsql volatile security definer set search_path = public as $$
begin
  if de is null or a is null or de = a then return; end if;
  if not exists (select 1 from familia_miembros where familia = f and miembro = de) then return; end if;
  insert into familia_miembros(familia, miembro, nombre, unido, visto, estado)
    select familia, a, nombre, unido, visto, estado from familia_miembros where familia = f and miembro = de
    on conflict (familia, miembro) do nothing;
  update familia_rezos set miembro = a where familia = f and miembro = de;
  update familias set creador = a where id = f and creador = de;
  delete from familia_miembros where familia = f and miembro = de;
end $$;

-- Solo quien la creó puede borrarla, con todo lo rezado.
create or replace function public.fam_borra(f text, mi uuid) returns boolean
language plpgsql volatile security definer set search_path = public as $$
begin
  delete from familias where id = f and creador = mi;
  return found;
end $$;

revoke all on function public.fam_ver(text, date, uuid), public.fam_crear(text, text, text, uuid, text, date), public.fam_entra(text, uuid, text, int, date),
  public.fam_reza(text, uuid, text, date, uuid, int, int, boolean), public.fam_edita(text, uuid, text, text, date), public.fam_une(text, uuid, uuid), public.fam_borra(text, uuid) from public;
grant execute on function public.fam_ver(text, date, uuid), public.fam_crear(text, text, text, uuid, text, date), public.fam_entra(text, uuid, text, int, date),
  public.fam_reza(text, uuid, text, date, uuid, int, int, boolean), public.fam_edita(text, uuid, text, text, date), public.fam_une(text, uuid, uuid), public.fam_borra(text, uuid) to anon, authenticated;
notify pgrst, 'reload schema';
select 'familias listas' as atrio;

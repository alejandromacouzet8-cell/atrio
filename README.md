# Atrio

Reza el rosario, la novena de Guadalupe y el Ángelus, solo o en familia.

- `index.html` es la app completa en un solo archivo (lo que publica GitHub Pages).
- `src/` tiene el código; `python3 build.py <URL de Supabase> <llave pública> index.html` lo arma.
- `supabase.sql` crea las tablas de veladoras y de avance, con sus reglas de acceso.
- `node test.js` y `node test_sb.js` corren las pruebas (necesitan `jsdom`).

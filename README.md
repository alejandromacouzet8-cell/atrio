# Atrio

Reza el rosario, la novena de Guadalupe y el Ángelus, solo o en familia.

- `index.html` es la app completa en un solo archivo (lo que publica GitHub Pages).
- `src/` tiene el código; `python3 build.py <URL de Supabase> <llave pública> index.html <dirección del sitio>` lo arma.
- `supabase.sql` crea las tablas de veladoras y de avance, con sus reglas de acceso.
- `node test.js` y `node test_sb.js` corren las pruebas (necesitan `jsdom`).

El acceso con Google está cerrado al público mientras la app de Google siga en modo de prueba: solo aparece si se abre la liga con `?google=1`. Para abrirlo a todos, armar con un quinto argumento `1`.

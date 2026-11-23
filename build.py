#!/usr/bin/env python3
"""Arma index.html en un solo archivo a partir de src/."""
import sys
SBU = sys.argv[1] if len(sys.argv) > 2 else ""
SBK = sys.argv[2] if len(sys.argv) > 2 else ""
OUT = sys.argv[3] if len(sys.argv) > 3 else "index.html"
SITIO = sys.argv[4] if len(sys.argv) > 4 else ""
# Solo la versión con dirección propia lleva descripción, vista previa para WhatsApp e iconos
CABEZA = f'''
<meta name="description" content="Reza el rosario, la novena de Guadalupe y el Ángelus, a solas o con tu familia, cada quien desde donde está.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Atrio">
<meta property="og:title" content="Atrio: reza el rosario en familia">
<meta property="og:description" content="El rosario, la novena de Guadalupe y el Ángelus, a solas o con tu familia, cada quien desde donde está.">
<meta property="og:url" content="{SITIO}">
<meta property="og:image" content="{SITIO}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="es_MX">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-title" content="Atrio">''' if SITIO else ""
r = lambda n: open("src/" + n, encoding="utf-8").read().replace("__SB_URL__", SBU).replace("__SB_KEY__", SBK)
html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0B3237">
<title>Atrio</title>{CABEZA}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Ibarra+Real+Nova:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap">
<style>
{r("app.css")}</style>
</head>
<body>
<main id="app"></main>
<script>
{r("map.js")}{r("data.js")}{r("app.js")}</script>
</body>
</html>
'''
open(OUT, "w", encoding="utf-8").write(html)
print(OUT, len(html.encode()), "bytes", "| servidor:", "sí" if SBU else "no")

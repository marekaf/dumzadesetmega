# Dům za deset mega

Statická vizualizace celkového daňového a úrokového zatížení při pořízení domu v ČR. Ukazuje, kolik z ceny domu reálně padne státu, bance a regulačnímu přídavku — a kolik zůstane jako reálná hodnota stavby.

CZ + EN. Vanilla HTML/CSS/JS, žádný build.

**Live:** https://dumzadesetmega.marekbartik.com

## Spuštění lokálně

```bash
python3 -m http.server 8000
# pak otevři http://localhost:8000
```

Žádné dependencies neinstaluješ — d3 a d3-sankey se načtou z jsdelivr CDN.

## Struktura

- `index.html` — single page, všechen markup
- `script.js` — kalkulační engine (anuitní splátka, gross/net inverze, breakdown po kategoriích) + d3-sankey rendering
- `translations.js` — i18n slovník CZ/EN + `setLanguage()` helper
- `style.css` — styling
- `og.png`, `favicon.svg` — sociální/branding assety
- `llms.txt`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` — SEO/AI discoverability

## Metodika

Všechny zdroje sazeb a předpokladů jsou citované přímo na stránce v sekci „Metodika a předpoklady". Sazby pro rok 2026.

## License

[MIT](LICENSE) — Marek Bartík, 2026. Forky a remixy vítány. Pokud uděláš variantu pro jinou zemi nebo jiné defaulty, dej vědět.

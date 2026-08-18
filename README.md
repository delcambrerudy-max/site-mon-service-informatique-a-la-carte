# Service Informatique à la Carte

Site vitrine **statique et responsive** pour un service informatique à la carte
réservé aux **professionnels** (entreprises, artisans, commerçants et indépendants).
Support, dépannage, installation, maintenance et conseil.

## Aperçu

- Site 100 % statique : HTML, CSS et JavaScript natifs, sans dépendance ni build.
- **Responsive** (mobile, tablette, desktop) avec un menu mobile « hamburger ».
- Sections : Hero, Services, À propos, Témoignages, Contact.
- Animations légères au défilement (respect de `prefers-reduced-motion`).
- Formulaire de contact avec validation côté client (démo — à brancher à un service d'envoi).

## Structure

```
.
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles responsive (mobile-first)
├── js/
│   └── main.js         # Menu mobile, scroll, animations, formulaire
├── assets/
│   └── favicon.svg     # Icône du site
└── README.md
```

## Utilisation

Ouvrez simplement `index.html` dans un navigateur, ou servez-le localement :

```bash
# Python 3
python3 -m http.server 8000
# puis http://localhost:8000
```

## Conformité cookies (RGPD / CNIL)

Un module de consentement cookies est intégré (`js/consent.js`) :

- Bandeau non intrusif au premier affichage, avec boutons **Tout accepter** et **Tout refuser** d'égale importance.
- Google Analytics (GA4) n'est chargé **qu'après** acceptation explicite ; aucun cookie tiers n'est déposé avant.
- Adresse IP anonymisée, aucun cookie publicitaire ni de profilage.
- Le consentement est mémorisé 6 mois (stockage local) ; l'utilisateur peut le révoquer via le lien **Cookies** du pied de page.
- La section *Cookies* des [mentions légales](mentions-legales.html#cookies) détaille finalités, durées et droits.

## Personnalisation

1. **Textes** : modifiez directement `index.html` (titres, services, témoignages).
2. **Couleurs** : variables CSS dans `css/style.css` (`:root`).
3. **Formulaire de contact** : branchez `js/main.js` à un service d'envoi
   (Formspree, Netlify Forms, une API…). Actuellement il ne fait qu'une démo côté client.

## Déploiement

Compatible avec GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.
Pour GitHub Pages : branche `main` → Settings → Pages → Source: `main` / root.

## Indexation par les moteurs de recherche et d'IA

Le site est configuré pour être indexé (domaine : `externe-dsi.fr`) :

- `robots.txt` autorise tous les crawlers, y compris les bots d'IA (GPTBot, ClaudeBot, PerplexityBot, AppleBot-Extended, Google-Extended, etc.), et déclare le sitemap.
- `sitemap.xml` liste les 14 pages avec priorités.
- Chaque page comporte : balise `canonical`, `meta robots`, Open Graph, Twitter Card, et données structurées JSON-LD (`Organization`, `WebSite`, `Service`).
- La page Mentions légales est en `noindex` (sans valeur pour la recherche).

## Licence

Tous droits réservés.

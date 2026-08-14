# Service Informatique à la Carte

Site vitrine **statique et responsive** pour un service informatique à la carte
(support, dépannage, installation, maintenance et conseil).

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

## Personnalisation

1. **Textes** : modifiez directement `index.html` (titres, services, témoignages).
2. **Couleurs** : variables CSS dans `css/style.css` (`:root`).
3. **Formulaire de contact** : branchez `js/main.js` à un service d'envoi
   (Formspree, Netlify Forms, une API…). Actuellement il ne fait qu'une démo côté client.

## Déploiement

Compatible avec GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.
Pour GitHub Pages : branche `main` → Settings → Pages → Source: `main` / root.

## Licence

Tous droits réservés.

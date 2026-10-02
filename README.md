# Vanguard Security

Static marketing site for **Vanguard Security**, a Kosovo-based protection company (Prishtina). Dark-gold neumorphic layout, official shield logo, services, demo past jobs, and social embeds.

Live GitHub Pages URL (after publish): `https://<your-username>.github.io/vanguard-security/`

## Social feeds

GitHub Pages cannot store Meta API secrets. Feeds are **public embeds**, configured in [`js/social.js`](js/social.js).

| Key | Demo value | Purpose |
| --- | --- | --- |
| `FACEBOOK_PAGE` / `facebookPage` | `Securitas` | Official Facebook Page Plugin timeline |
| `INSTAGRAM_HANDLE` / `instagramHandle` | `securitas` | Profile link |
| `instagramPosts` | public post permalinks | Instagram embed script |
| `instagramFallback` | local photos | Grid if embeds are blocked |

Replace those IDs with your own page username, handle, and post URLs.

## Local preview

Open `index.html` in a browser, or from the folder:

```bash
npx --yes serve .
```

## Stack

HTML, CSS, vanilla JS. Lucide icons. Cinzel + Source Sans 3. Unsplash photos stored in `assets/`.

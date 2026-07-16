# Spotify Clone — React + Vite version

This is the React port of your original vanilla HTML/CSS/JS Spotify clone.
Same features: player, search, sidebar, Firebase auth (login/signup/Google/
password reset), 20-second preview limit for logged-out visitors, and the
account dropdown (Profile / Settings / Log out).

## 1. Copy your assets over

Copy your existing `images/`, `songs/` folders from the old
project into this project's `public/` folder, so you end up with:

```
public/
  images/
  songs/
```

Vite serves everything in `public/` at the site root, so `/images/foo.jpg`
in the code will resolve to `public/images/foo.jpg` on disk — no code
changes needed as long as the folder names match.

## 2. Install dependencies

```bash
npm install
```

## 3. Set up your environment variables

```bash
cp .env.example .env
```

Then fill in your real Firebase config values in `.env` (from Firebase
console → Project settings → Your apps → Web app). This repo already
includes a `.env` with your current project's values filled in for local
use — just double check it matches your Firebase project before running.

`.env` is in `.gitignore` — it will NOT be pushed to GitHub.

## 4. Run it locally

```bash
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo (`.env` won't come along, which is expected).
2. In Vercel: **Add New → Project** → import the repo.
3. Vercel will auto-detect Vite — leave build settings as default.
4. Before deploying, go to **Project Settings → Environment Variables** and
   add the same 6 `VITE_FIREBASE_...` variables from your `.env` file.
5. Deploy.
6. Add your Vercel domain to **Firebase console → Authentication → Settings
   → Authorized domains**, or login/signup will fail on the live site.

## Project structure

```
src/
  firebase.js          Firebase init, reads config from import.meta.env
  data/songs.js         Song data (title/artist/cover/src) — edit this to add songs
  hooks/useAuth.js       All Firebase auth actions as a hook
  hooks/usePlayer.js     Audio playback + 20s preview-limit logic
  components/
    Sidebar.jsx
    TopNav.jsx           Search bar, login/signup buttons, account dropdown
    SongSection.jsx      One row of song cards
    MusicBar.jsx         Bottom mini-player
    AuthModal.jsx        Login/signup form
    AccountModal.jsx     Profile + Settings (password change, delete account)
    Footer.jsx
  App.jsx                Wires everything together
  index.css              Same styling as the original, adapted for class-based selectors
```

## Adding more songs

Edit `src/data/songs.js` — each section is a plain array of
`{ title, artist, cover, src }` objects. Add your MP3 to `public/songs/`
and reference it as `/songs/your-file.mp3`.

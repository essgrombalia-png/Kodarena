# Kodarena Web Academy

Kodarena is a full-stack frontend learning academy for HTML5, CSS3, and modern JavaScript. It includes structured lessons, an interactive playground, quizzes, progress tracking, AI coaching, and a printable certificate workflow.

## Features

- Structured HTML5, CSS3, and JavaScript curriculum
- Interactive code playground and lesson exercises
- Quiz scoring, XP, streaks, badges, and progress analytics
- Swedish and English interface
- Account-gated academy experience with local browser persistence
- Certificate themes with PDF, PNG, print, share, and verification details
- Optional Gemini-powered AI coach and debugger

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment

Copy `.env.example` to `.env.local` when using the AI features and set:

```env
GEMINI_API_KEY=your_api_key
APP_URL=http://localhost:3000
```

The environment file is ignored by Git. Never commit API keys or other secrets.

For server-side authentication, also set `ADMIN_PASSWORD` in the server environment. The current GitHub Pages demo still uses browser-local accounts; deploy the Express server separately to use the secure auth endpoints.

## Production build

```bash
npm run build
npm start
```

## Publish to GitHub

Create an empty repository on GitHub, then run:

```bash
git init
git add .
git commit -m "Initial Kodarena Web Academy release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

The local account and progress data are stored in the browser. A production deployment should replace this with server-side authentication and persistence.

# Yaswanth Gorle – Portfolio (Next.js)

Next.js 15 (App Router) + React 19 + TypeScript. The backend is built in: API route handlers under `app/api`.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Edit your content

Everything on the page comes from `lib/data.ts` (profile, social links, experience, projects, skills, education).
Your photo is `public/images/profile.webp` (transparent background) and the resume is `public/files/`.

## Contact form

`POST /api/contact` validates input, blocks spam (hidden honeypot field), rate-limits to 5 messages per 10 minutes
per IP, and saves messages to `data/messages.json`.

Read them at `/api/admin/messages?token=YOUR_TOKEN` after setting `ADMIN_TOKEN`:

```powershell
# Windows PowerShell
$env:ADMIN_TOKEN="choose-a-long-random-string"; npm run dev
```

```bash
# macOS / Linux
ADMIN_TOKEN="choose-a-long-random-string" npm run dev
```

Without `ADMIN_TOKEN` the endpoint is disabled. Set `MESSAGES_FILE` to store messages somewhere else.

> **Deploying to Vercel/Netlify:** their filesystems are temporary, so saved messages will not last. Use a VPS/Render
> with a persistent disk, or swap `lib/messages.ts` for a database or email service (e.g. Resend).

## API

| Route | Method | Purpose |
| --- | --- | --- |
| `/` | GET | Portfolio page |
| `/api/profile` | GET | All content as JSON |
| `/api/contact` | POST | Submit the contact form |
| `/api/admin/messages` | GET | Read messages (needs `ADMIN_TOKEN`) |

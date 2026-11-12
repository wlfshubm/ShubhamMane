# Portfolio

## Adding a project (icon + banner)
1. Put two images in `img/projects/<project-id>/`:
   - `icon.png` (square, 256×256)
   - `banner.png` (16:8, e.g. 1600×800)
   (`.svg`, `.jpg` and `.webp` work too.)
2. In `js/main.js`, add an entry to the `P` array:
   `{id:'my-project', icon:'img/projects/my-project/icon.png', banner:'img/projects/my-project/banner.png', t:'My Project', ...}`
If `icon` / `banner` are left out, the site shows a letter icon and the gradient cover.

## Contact form -> your Gmail
The form posts to `/api/contact` (`api/contact.js`), which emails you via Gmail.
1. Turn on 2-Step Verification: https://myaccount.google.com/security
2. Create an App Password: https://myaccount.google.com/apppasswords (16 characters)
3. In Vercel: Project -> Settings -> Environment Variables, add
   `GMAIL_USER` = Shivammane666@gmail.com
   `GMAIL_APP_PASSWORD` = the 16-character app password
4. Redeploy: `npm run deploy`
Messages arrive in your inbox; hit Reply to answer the visitor directly.

Local testing: copy `.env.example` to `.env`, then `npm install && npm run dev`
(`npm start` serves only the static site, so the form will not work there).

# Vercel Deployment (Client + Server Separate)

## 1) Deploy Backend (`server`)

1. Create a new Vercel project and set root directory to `server`.
2. Vercel will use `server/vercel.json` and deploy Express as serverless function.
3. Add environment variables in Vercel Project Settings:
   - `CLIENT_URL` = your frontend production URL
   - `CLIENT_URLS` = comma-separated allowed origins (optional, for preview URLs too)
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `EMAIL_TO`
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `SITE_NAME`
   - `SITE_URL`
4. Deploy and copy backend URL (example: `https://your-backend.vercel.app`).

## 2) Deploy Frontend (`client`)

1. Create another Vercel project and set root directory to `client`.
2. Add environment variable:
   - `VITE_API_URL` = backend URL from step 1 (without trailing slash).
3. Deploy.

## 3) Update Backend CORS (important)

After frontend URL is final, make sure backend env has:
- `CLIENT_URL=https://your-frontend.vercel.app`
- (optional) `CLIENT_URLS=https://your-frontend.vercel.app,https://your-preview.vercel.app`

Redeploy backend after env updates.

## 4) Security / `.env` handling

- `.env` and `.env.*` are ignored in:
  - `server/.gitignore`
  - `server/.vercelignore`
  - `client/.gitignore`
  - `client/.vercelignore`
- `.env.example` files are included for reference only.

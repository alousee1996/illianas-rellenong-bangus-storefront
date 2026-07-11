# Deployment Guide: GitHub → Neon → Vercel

A beginner-friendly guide to taking Illiana's Rellenong Bangus live on the internet.

## What You'll Need

- A computer (Mac, Windows, or Linux)
- An internet connection
- About 30 minutes
- A credit card (for account verification — all services have free tiers)

## The Three Services

| Service | What it does | Free tier |
|---------|-------------|-----------|
| **GitHub** | Stores your code online (like Google Drive for code) | Free |
| **Neon** | Your database — stores products, orders, reviews | 0.5 GB free |
| **Vercel** | Runs your website 24/7 on the internet | 100 GB bandwidth/month |

---

## Phase 1: Create Your Accounts (5 min)

### Step 1: GitHub
1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Use your email, create a password, pick a username (e.g., `illianas-ph`)
4. Complete the signup and verify your email

### Step 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** — a popup will ask you to log in with your GitHub account
4. Click **Authorize Vercel** to connect the two accounts

### Step 3: Neon
1. Go to [neon.tech](https://neon.tech)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Click **Authorize Neon**

---

## Phase 2: Get Your Code (5 min)

### Option A: Download from sandbox
1. Download the `illianas-storefront.tar.gz` file from your sandbox
2. Extract it to a folder on your computer (e.g., Desktop/illianas)
3. You should see folders like `src/`, `public/`, `scripts/`, and files like `package.json`

### Option B: Recreate from scratch
If you can't download, you can create a new folder and copy files from this project.

---

## Phase 3: Put Your Code on GitHub (10 min)

### Method A: GitHub Desktop (EASIEST — no command line)

1. Download [GitHub Desktop](https://desktop.github.com) (free)
2. Install and open it
3. Sign in with your GitHub account
4. Click **Add an Existing Repository** or **File → New Repository**
5. Choose the folder where you extracted the project
6. If it says "This directory does not appear to be a Git repository" — check the box **Create a Repository** and click **Create**
7. You'll see a list of all your files on the left
8. In the bottom-left, type a summary like "Initial commit" and click **Commit to main**
9. Click **Publish repository** (top-right)
10. Uncheck **Keep this code private** (so Vercel can access it) and click **Publish**

### Method B: Command Line (if you're comfortable with terminal)

```bash
# Open Terminal/Command Prompt in your project folder
cd path/to/illianas-storefront

# Initialize git (already done if you downloaded the tarball)
git init
git branch -M main
git add -A
git commit -m "Initial commit"

# Create a new repo on github.com first (don't add README), then:
git remote add origin https://github.com/YOUR_USERNAME/illianas-rellenong-bangus.git
git push -u origin main
```

✅ **Verify**: Go to `github.com/YOUR_USERNAME/illianas-rellenong-bangus` — you should see all your files there.

---

## Phase 4: Create Your Database (5 min)

1. Go to [neon.tech](https://neon.tech) and sign in
2. Click **Create Project**
3. Name it `illianas-db`
4. For database name, enter `app_db`
5. For region, choose **US East** or whichever is closest to your customers
6. Click **Create Project**
7. Neon will show you a **connection string** — it looks like:
   ```
   postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/app_db?sslmode=require
   ```
8. **Copy this connection string** and save it somewhere safe (you'll need it in Phase 5)

> ⚠️ If you miss the connection string, you can find it later:
> 1. Click your project in Neon
> 2. Click **Connection Details** on the left
> 3. Select **Pooled connection** from the dropdown
> 4. Copy the connection string

---

## Phase 5: Deploy to Vercel (10 min)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. You'll see a list of your GitHub repositories
4. Find **illianas-rellenong-bangus** and click **Import**
5. On the configuration page:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: Should already be set (from `vercel.json`). If not, enter:
     ```
     npx drizzle-kit push --force && next build
     ```
   - **Install Command**: `npm install` (auto-detected)
6. Scroll down to **Environment Variables**
7. Add a new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste the Neon connection string from Phase 4
8. Click **Deploy**
9. Wait 1-2 minutes for the build to complete

✅ **You're live!** Vercel will show a congratulations screen with your live URL.

---

## Phase 6: Verify It Works (5 min)

1. Click the live URL Vercel gives you (e.g., `illianas.vercel.app`)
2. You should see the home page with the hero section
3. Click **Shop** — you should see 6 products
4. Click any product — you should see the detail page with reviews
5. Add something to the cart — the cart drawer should slide out
6. Go to checkout — fill in the form and place an order

✅ If all of the above works, your store is live and ready for business!

---

## Troubleshooting

### "Build failed" on Vercel
- **Check the build logs**: Click the deployment, then **View Build Logs**
- **Common cause**: `DATABASE_URL` not set. Go to Project Settings → Environment Variables and verify `DATABASE_URL` exists
- **Common cause**: Neon database not reachable. Make sure you selected a region and the database is active

### Products not showing on the live site
- The database auto-seeds on first visit. Visit `/api/health` in your browser to trigger the seed
- Check the Neon dashboard to verify the database is running

### "Connection refused" error
- Your Neon connection string might be wrong. Go to Neon → Connection Details → copy the **Pooled connection** string
- Make sure it starts with `postgresql://` and includes `?sslmode=require`

### Cart not working
- The cart uses browser localStorage. Try clearing your browser cache
- Make sure you're not in incognito mode (localStorage may be disabled)

### Want a custom domain (e.g., www.illianas.ph)?
1. In Vercel, go to **Project Settings → Domains**
2. Add your domain
3. Vercel will give you DNS records to add at your domain registrar
4. Vercel automatically sets up HTTPS (free SSL certificate)

---

## Updating Your Store

When you make changes to the code:
1. Open GitHub Desktop
2. You'll see the changed files listed
3. Type a summary (e.g., "Updated product prices")
4. Click **Commit to main**
5. Click **Push origin** (top-right)
6. Vercel automatically rebuilds and deploys within 1-2 minutes!

---

## Cost Summary

| Service | Free Tier | When you'd upgrade |
|---------|-----------|-------------------|
| GitHub | Unlimited public repos | Never (free is enough) |
| Neon | 0.5 GB storage, 1 project | ~$19/month when you exceed 0.5 GB |
| Vercel | 100 GB bandwidth/month | ~$20/month when you exceed 100 GB |

For a small-to-medium food business, you'll likely stay on free tiers for months or even years.

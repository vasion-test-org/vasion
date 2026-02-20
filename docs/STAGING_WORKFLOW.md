# Vasion Staging Environment - Complete Setup Guide

## Overview

This document outlines the staging environment setup for `vasion.com` on Vercel, enabling the team to test changes before deploying to production using GitHub Pull Requests.

---

## 🌐 Environment URLs

| Environment    | URL                            | Branch    | Purpose                              |
| -------------- | ------------------------------ | --------- | ------------------------------------ |
| **Production** | `vasion.com`                   | `main`    | Live production site                 |
| **Staging**    | `staging-marketing.vasion.com` | `staging` | Testing and review before production |

---

## 📋 What Was Set Up

### 1. Vercel Staging Environment

- Created a custom "staging" environment in Vercel
- Configured to automatically deploy the `staging` branch
- Set up `staging-marketing.vasion.com` domain

### 2. DNS Configuration

- Added CNAME record for `staging-marketing.vasion.com`
  - **Type**: CNAME
  - **Name**: `staging-marketing`
  - **Value**: `087db39a63d92be5.vercel-dns-016.com`

### 3. Deployment Protection

- Disabled Vercel Authentication for easy team access
- `staging-marketing.vasion.com` is publicly accessible (but not advertised)

### 4. Git Branch Structure

```
main (production - vasion.com)
  ↑
staging (testing - staging-marketing.vasion.com)
  ↑
feature/* (development branches)
```

---

## 🚀 Developer Workflow (Recommended)

### Using GitHub Pull Requests

This is the **recommended workflow** for teams - it uses GitHub's UI for merging and provides built-in code review.

#### Step 1: Create a Feature Branch from Main

```bash
# Make sure main is up to date
git checkout main
git pull origin main

# Create your feature branch from main
git checkout -b feature/descriptive-name
```

**Example branch names:**

- `feature/new-pricing-page`
- `feature/contact-form-update`
- `bugfix/header-mobile-issue`
- `hotfix/broken-link`

**Why branch from `main`?**

- Keeps your feature isolated and clean
- Starts from known-good production code
- Prevents accidentally including unfinished work from staging

#### Step 2: Develop and Push to GitHub

```bash
# Make your changes
# ... edit files ...

# Commit your work
git add .
git commit -m "Add new pricing page with comparison table"

# Push to GitHub
git push origin feature/descriptive-name
```

**Note:** Pushing your feature branch to GitHub does **NOT** merge it anywhere or trigger any deployments. It just makes your branch available on GitHub.

#### Step 3: Create Pull Request to Staging

1. Go to GitHub repository
2. Click **"Pull requests"** → **"New pull request"**
3. Set **base branch** to: `staging`
4. Set **compare branch** to: `feature/your-feature-name`
5. Add title and description
6. Click **"Create pull request"**
7. (Optional) Request reviews from team members

#### Step 4: Review and Merge to Staging

1. Team reviews the code in the PR
2. Make any requested changes and push again to update the PR
3. Once approved, click **"Merge pull request"** on GitHub
4. Delete the feature branch (GitHub will offer this option)

**Result:** Vercel automatically deploys the updated `staging` branch to `staging-marketing.vasion.com` in ~2-5 minutes

#### Step 5: Test on Staging

- Visit `staging-marketing.vasion.com` to verify changes
- Share specific URLs with stakeholders:
  - Example: `staging-marketing.vasion.com/pricing`
  - Example: `staging-marketing.vasion.com/contact`
- Test forms, navigation, and all functionality
- Get stakeholder approval

#### Step 6: Create Pull Request to Production

Once testing is complete and approved:

1. Go to GitHub repository
2. Click **"Pull requests"** → **"New pull request"**
3. Set **base branch** to: `main`
4. Set **compare branch** to: `staging`
5. Add title like "Deploy staging to production - [date]"
6. List all features/fixes included
7. Click **"Create pull request"**
8. Get final approval from team lead
9. Click **"Merge pull request"**

**Result:** Vercel automatically deploys to `vasion.com` 🎉

---

## 🔄 Alternative Workflow: Command Line Only

If you prefer not to use GitHub's UI, you can merge locally:

### Deploy to Staging

```bash
# After pushing your feature branch
git checkout staging
git pull origin staging

# Merge your feature
git merge feature/your-feature-name

# Push to trigger deployment
git push origin staging
```

### Deploy to Production

```bash
# After testing on staging
git checkout main
git pull origin main

# Merge staging
git merge staging

# Push to trigger deployment
git push origin main
```

---

## 🎯 Quick Workflow Comparison

### GitHub PR Method (Recommended) ✅

**Pros:**

- Visual code review interface
- Track what's deployed where
- Clear approval process
- Easy to see PR history
- Can request reviews
- One-click merge

**Cons:**

- Requires using GitHub UI
- Slightly more steps

### Command Line Method

**Pros:**

- Faster for experienced developers
- No context switching
- Works offline

**Cons:**

- No visual code review
- Harder to track what was deployed
- No approval process
- Must remember commands

---

## 📊 Visual Git Flow

```
Developer creates feature:
  main
   └─> feature/new-page

Push to GitHub:
  origin/main
  origin/staging
  origin/feature/new-page  (exists separately)

PR to staging and merge:
  origin/staging (now includes feature/new-page)
    └─> Deploys to staging-marketing.vasion.com

Test and approve:
  ✓ Test on staging
  ✓ Get stakeholder approval

PR to main and merge:
  origin/main (now includes staging)
    └─> Deploys to vasion.com
```

---

## 🧪 Testing Checklist

Before merging staging to production, verify:

- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Navigation works on desktop and mobile
- [ ] Images display properly
- [ ] Storyblok content renders correctly
- [ ] No console errors in browser DevTools
- [ ] Links go to correct destinations
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Page load speed is acceptable
- [ ] SEO meta tags are correct

---

## ⚙️ Vercel Configuration Details

### Branch Tracking

- **Environment Name:** staging
- **Branch Pattern:** Branch is `staging`
- **Effect:** Any push to the `staging` branch triggers automatic deployment to `staging-marketing.vasion.com`

### Domains

- **staging-marketing.vasion.com** → staging environment (`staging` branch)
- **vasion.com, de.vasion.com, fr.vasion.com, www.vasion.com** → production environment (`main` branch)

### Deployment Protection

- **Vercel Authentication:** Disabled
- **Reason:** Allows team members to access staging without Vercel login
- **Note:** Staging URL is not publicly advertised, providing security through obscurity

### Environment Variables

- Configure in Vercel: **Settings → Environment Variables**
- Can set different values for Production vs Preview/Staging
- Storyblok API keys and other secrets stored here

### Fluid Compute

- **Status:** Available to enable
- **Recommendation:** Test on staging first, then enable on production
- **Benefits:** Better cold start performance, more consistent response times
- **Location:** Settings → Functions
- **How to disable if needed:** Toggle off in same location

---

## 🛠️ Common Tasks

### View Deployment Status

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project (vasion.com)
3. View recent deployments by environment (Production vs Staging)
4. Click on deployment to see build logs

### Check Build Logs

1. Go to Vercel Dashboard
2. Click on a specific deployment
3. View "Building" tab for build logs
4. View "Functions" tab for runtime errors

### Rollback a Deployment

If production has issues:

1. Go to Deployments tab in Vercel
2. Find the previous working deployment
3. Click "..." menu → "Promote to Production"
4. Confirm rollback

Or via Git:

```bash
git checkout main
git revert HEAD  # Creates new commit that undoes last changes
git push origin main
```

### Check What's Currently Deployed

```bash
# See what commits are in staging but not in main
git log main..staging

# See what commits are in main but not in staging
git log staging..main
```

### Keep Staging Synced with Main

If staging gets behind main:

```bash
git checkout staging
git pull origin staging
git merge main
git push origin staging
```

---

## 🚨 Troubleshooting

### "Staging site won't load" or "Shows old content"

**Check if staging branch exists:**

```bash
git branch -a | grep staging
```

**If missing, recreate it:**

```bash
git checkout main
git pull origin main
git checkout -b staging
git push -u origin staging
```

**Clear browser cache:**

- Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or open in Incognito/Private mode

### "Changes aren't showing up on staging"

1. **Verify branch was merged:**
   - Check GitHub to confirm PR was merged
   - Run `git log staging` to see recent commits

2. **Check Vercel build status:**
   - Go to Vercel Dashboard
   - Look for recent deployment
   - Check if build succeeded or failed

3. **Check build logs for errors:**
   - Click on deployment in Vercel
   - Review build output
   - Look for error messages

4. **Verify correct branch:**
   ```bash
   git branch  # Shows current branch
   git status  # Shows working directory status
   ```

### "Accidentally deleted staging branch"

**Recreate from main:**

```bash
git checkout main
git pull origin main
git checkout -b staging
git push -u origin staging
```

**Or restore from Git reflog:**

```bash
# Find the last staging commit
git reflog

# Look for: "checkout: moving from staging to main"
# Note the commit hash (e.g., abc1234)

# Recreate staging at that commit
git checkout -b staging abc1234
git push -u origin staging
```

**Or restore from GitHub (if it still exists remotely):**

```bash
git fetch origin
git checkout -b staging origin/staging
git push -u origin staging
```

### "Getting Vercel login screen"

This means Vercel Authentication was re-enabled:

1. Go to Vercel Dashboard
2. Navigate to **Settings → Deployment Protection**
3. Find "Vercel Authentication"
4. Toggle it **OFF**
5. Click **Save**

### "Merge conflict when merging to staging/main"

```bash
# If conflict occurs during merge
git status  # Shows conflicting files

# Open conflicting files and resolve conflicts
# Look for conflict markers: <<<<<<<, =======, >>>>>>>

# After resolving
git add .
git commit -m "Resolve merge conflicts"
git push origin [branch-name]
```

### "Feature branch is out of date with main"

Update your feature branch with latest main:

```bash
git checkout feature/your-feature
git fetch origin
git merge origin/main
# Resolve any conflicts
git push origin feature/your-feature
```

---

## 🔒 Branch Protection (Recommended)

Protect `main` and `staging` branches from accidental deletion and force pushes.

### Setup on GitHub:

1. Go to **Settings → Branches**
2. Click **Add branch protection rule**
3. **Branch name pattern:** `main`
4. Enable these rules:
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1 (optional, for code review)
   - ✅ **Require status checks to pass before merging**
   - ✅ **Do not allow bypassing the above settings**
   - ✅ **Restrict who can push to matching branches** (optional)
5. Click **Create**

6. **Repeat for `staging` branch**

**Benefits:**

- Prevents accidental deletion of critical branches
- Prevents force pushes that rewrite history
- Enforces code review process
- Ensures tests pass before merging (if you have CI/CD)

---

## 👥 Team Collaboration Scenarios

### Multiple Developers Working Simultaneously

**Developer A:**

```bash
git checkout main
git checkout -b feature/new-pricing
# ... work on pricing page ...
git push origin feature/new-pricing
# Create PR: feature/new-pricing → staging
```

**Developer B:**

```bash
git checkout main
git checkout -b feature/contact-form
# ... work on contact form ...
git push origin feature/contact-form
# Create PR: feature/contact-form → staging
```

Both PRs can be merged to staging independently, and both features will be tested together on `staging-marketing.vasion.com` before going to production.

### Urgent Hotfix Process

For critical bugs in production:

```bash
# Create hotfix from main (current production)
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# Make the fix
# ... edit files ...
git add .
git commit -m "Fix critical bug in checkout process"
git push origin hotfix/critical-bug-fix
```

**On GitHub:**

1. Create PR: `hotfix/critical-bug-fix` → `staging`
2. Quick test on staging
3. Create PR: `hotfix/critical-bug-fix` → `main` (or merge staging → main)
4. Deploy to production immediately

**After hotfix:**

```bash
# Sync staging with the hotfix
git checkout staging
git merge main
git push origin staging
```

### Code Review Best Practices

When reviewing PRs:

- ✅ Check for code quality and consistency
- ✅ Verify no console errors or warnings
- ✅ Test functionality on staging after merge
- ✅ Review responsive design changes
- ✅ Check for accessibility issues
- ✅ Ensure no sensitive data is committed
- ✅ Verify environment variables are used correctly

---

## 📝 Quick Reference Commands

### Initial Setup (One Time)

```bash
git checkout main
git checkout -b staging
git push -u origin staging
```

### Daily Feature Development Workflow

```bash
# 1. Create feature from main
git checkout main
git pull origin main
git checkout -b feature/my-feature

# 2. Work and commit
# ... make changes ...
git add .
git commit -m "Add new feature"
git push origin feature/my-feature

# 3. Create PR on GitHub: feature/my-feature → staging
# 4. Merge PR on GitHub
# 5. Test on staging-marketing.vasion.com
# 6. Create PR on GitHub: staging → main
# 7. Merge PR on GitHub
# 8. Verify on vasion.com
```

### Command Line Alternative

```bash
# Deploy to staging
git checkout staging
git pull origin staging
git merge feature/my-feature
git push origin staging

# Deploy to production
git checkout main
git pull origin main
git merge staging
git push origin main
```

### Useful Git Commands

```bash
# See all branches
git branch -a

# See current branch
git branch

# See what's different between branches
git diff staging main

# See commit history
git log --oneline

# See what's deployed where
git log main..staging  # Commits in staging but not main

# Update your branch with latest changes
git fetch origin
git pull origin main

# Delete local branch
git branch -d feature/my-feature

# Delete remote branch (after PR is merged)
git push origin --delete feature/my-feature
```

---

## 🎯 Best Practices

### DO:

✅ Always branch from `main` for new features  
✅ Use descriptive branch names (`feature/`, `bugfix/`, `hotfix/`)  
✅ Test thoroughly on staging before merging to main  
✅ Use Pull Requests for code review and tracking  
✅ Write clear commit messages describing what changed  
✅ Delete feature branches after merging  
✅ Keep staging synced with main regularly  
✅ Share staging links with stakeholders for approval  
✅ Check Vercel deployment status after merging

### DON'T:

❌ Push untested code directly to `main`  
❌ Branch from `staging` (always branch from `main`)  
❌ Force push to `main` or `staging` (`git push -f`)  
❌ Leave feature branches open for weeks  
❌ Skip testing on staging environment  
❌ Commit sensitive data (API keys, passwords)  
❌ Make commits directly to `main` or `staging`  
❌ Merge PRs without reviewing changes

---

## 🔐 Security Considerations

### Environment Variables

- Never commit API keys or secrets to Git
- Store all secrets in Vercel Environment Variables
- Use different keys for staging vs production when possible
- Rotate keys if accidentally committed

### Access Control

- Staging is publicly accessible but not advertised
- Consider enabling Vercel Authentication if handling sensitive data
- Use branch protection rules on GitHub
- Limit who can approve PRs to main

### Monitoring

- Check Vercel logs for suspicious activity
- Monitor for failed deployments
- Set up alerts for production errors
- Review who has access to Vercel and GitHub

### SEO Protection

Add this to prevent staging from being indexed by search engines:

```jsx
// In your _app.js or root layout component
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const isStaging = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

  return (
    <>
      <Head>{isStaging && <meta name="robots" content="noindex, nofollow" />}</Head>
      <Component {...pageProps} />
    </>
  );
}
```

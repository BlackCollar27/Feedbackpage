# 🚀 Backend Developer Quick Start Guide

**For:** Ruby on Rails developer deploying to Railway  
**Frontend:** React (already complete)  
**Your Task:** Build the Rails API backend

---

## ⚡ 5-Minute Overview

### What You're Building
A **Rails API-only backend** that serves a React frontend already built and waiting for you.

### What's Already Done ✅
- ✅ All 39 frontend pages
- ✅ 20 email templates (HTML ready for Resend)
- ✅ Complete UI/UX
- ✅ Routing and navigation
- ✅ Mock data showing what API responses should look like

### What You Need to Build
- Rails API with 41 endpoints
- PostgreSQL database
- Google OAuth (OmniAuth)
- Stripe integration
- Resend email sending
- File upload (AWS S3)

---

## 🎯 Top 5 Priorities (Do These First)

### 1. ⚠️ NEW PASSWORD RESET PAGES (JUST ADDED)
**3 new frontend pages were just created - you MUST implement these endpoints:**

```ruby
# app/controllers/api/auth_controller.rb

# Endpoint 1: Request password reset
POST /api/auth/forgot-password
  params: { email: string }
  action: 
    - Find user by email
    - Generate reset token (24 hour expiry)
    - Send password reset email via Resend
  response: { message: "Reset email sent" }

# Endpoint 2: Reset password with token
POST /api/auth/reset-password
  params: { 
    token: string, 
    password: string, 
    password_confirmation: string 
  }
  action:
    - Validate token (not expired)
    - Update user password
    - Invalidate token
  response: { message: "Password reset successful" }

# Endpoint 3: Verify email with token  
GET /api/auth/verify-email?token=xxx
  action:
    - Validate token
    - Mark user email as verified
    - Invalidate token
  response: { success: true, message: "Email verified" }
```

**Frontend Pages:**
- `/forgot-password` - User enters email
- `/reset-password?token=xxx` - User sets new password
- `/email-verification?token=xxx` - Auto-verifies email

**Email Templates to Use:**
- `/email-templates/auth/password-reset.html`
- `/email-templates/auth/email-verification.html`

---

### 2. Google OAuth Setup

**Gems Needed:**
```ruby
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'omniauth-rails_csrf_protection'
```

**Config:**
```ruby
# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
    ENV['GOOGLE_CLIENT_ID'],
    ENV['GOOGLE_CLIENT_SECRET'],
    {
      scope: 'email,profile',
      callback_path: '/auth/google_oauth2/callback'
    }
end
```

**Routes:**
```ruby
get '/auth/google_oauth2/callback', to: 'sessions#google_callback'
```

**Frontend Hook:**
```typescript
// Already in LoginPage.tsx
window.location.href = '/auth/google_oauth2';
```

---

### 3. Stripe Webhooks

**Endpoint:**
```ruby
POST /api/webhooks/stripe

# Events to handle:
- checkout.session.completed
- customer.subscription.updated  
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed
```

**Frontend Triggers:**
```typescript
// PricingPage.tsx creates checkout sessions
fetch('/api/stripe/create-checkout-session', {
  method: 'POST',
  body: JSON.stringify({ priceId, planId, billingPeriod })
});
```

---

### 4. Resend Email Integration

**Gem:**
```ruby
gem 'resend'
```

**Setup:**
```ruby
# config/initializers/resend.rb
Resend.api_key = ENV['RESEND_API_KEY']
```

**Example:**
```ruby
# app/mailers/auth_mailer.rb
def welcome_email(user)
  template = File.read(Rails.root.join('email-templates/auth/welcome.html'))
  html = template.gsub('{{business_name}}', user.business_name)
  
  Resend::Emails.send(
    from: 'notifications@feedback-page.com',
    to: user.email,
    subject: 'Welcome to Feedback Page!',
    html: html
  )
end
```

**All 20 templates are in:** `/email-templates/`

---

### 5. Replace Mock Data

**Search for:** `TODO: Replace with actual API call`

**Files with TODOs (28 total):**
- Admin panel: 13 TODOs
- Dashboard: 5 TODOs  
- Settings: 4 TODOs
- Other: 6 TODOs

**Example:**
```typescript
// BEFORE (current mock data):
const loadUsers = async () => {
  // TODO: Replace with actual API call
  const mockData = [{ id: 1, name: "Test User" }];
  setUsers(mockData);
};

// AFTER (your Rails API):
const loadUsers = async () => {
  const response = await fetch('/api/admin/users');
  const data = await response.json();
  setUsers(data);
};
```

---

## 📋 Complete API Endpoints Checklist

### Authentication (9 endpoints)
- [ ] POST /api/auth/signup
- [ ] POST /api/auth/login
- [ ] POST /api/auth/logout
- [ ] GET /api/auth/me
- [ ] **POST /api/auth/forgot-password** ⚠️ NEW - CRITICAL
- [ ] **POST /api/auth/reset-password** ⚠️ NEW - CRITICAL
- [ ] **GET /api/auth/verify-email** ⚠️ NEW - CRITICAL
- [ ] GET /auth/google_oauth2
- [ ] GET /auth/google_oauth2/callback

### Business (3 endpoints)
- [ ] POST /api/business
- [ ] GET /api/business/:id
- [ ] PUT /api/business/:id

### Locations (7 endpoints)
- [ ] GET /api/locations
- [ ] GET /api/locations/:id
- [ ] POST /api/locations
- [ ] PUT /api/locations/:id
- [ ] DELETE /api/locations/:id
- [ ] POST /api/locations/:id/upload-logo (file upload)
- [ ] DELETE /api/locations/:id/feedback (delete all)

### Feedback (3 endpoints)
- [ ] POST /api/feedback
- [ ] GET /api/business/:id/feedback
- [ ] PUT /api/feedback/:id/mark-resolved

### Opt-ins (2 endpoints)
- [ ] POST /api/opt-in
- [ ] GET /api/business/:id/opt-ins

### Stripe (4 endpoints)
- [ ] POST /api/stripe/create-checkout-session
- [ ] POST /api/stripe/create-portal-session
- [ ] POST /api/stripe/cancel-subscription
- [ ] POST /api/webhooks/stripe

### Admin (13 endpoints)
- [ ] POST /api/admin/login
- [ ] GET /api/admin/dashboard
- [ ] GET /api/admin/users
- [ ] GET /api/admin/users/:id
- [ ] GET /api/admin/users/export.csv
- [ ] GET /api/admin/locations
- [ ] GET /api/admin/locations/:id
- [ ] GET /api/admin/locations/export.csv
- [ ] GET /api/admin/feedback
- [ ] GET /api/admin/feedback/export.csv
- [ ] GET /api/admin/analytics
- [ ] GET /api/admin/analytics/export.csv
- [ ] GET /api/admin/settings
- [ ] PUT /api/admin/settings

**Total:** 41 endpoints

---

## 🗄️ Database Schema Needed

### Users Table
```ruby
create_table :users do |t|
  t.string :email, null: false, index: { unique: true }
  t.string :password_digest
  t.string :name
  t.string :google_id, index: true
  t.string :avatar_url
  t.boolean :email_verified, default: false
  t.string :email_verification_token
  t.datetime :email_verification_sent_at
  t.string :password_reset_token
  t.datetime :password_reset_sent_at
  t.references :business
  t.timestamps
end
```

### Businesses Table
```ruby
create_table :businesses do |t|
  t.string :name, null: false
  t.string :email
  t.string :phone
  t.string :website
  t.string :industry
  t.string :stripe_customer_id
  t.string :stripe_subscription_id
  t.string :plan, default: 'trial'
  t.string :subscription_status
  t.datetime :trial_ends_at
  t.timestamps
end
```

### Locations Table
```ruby
create_table :locations do |t|
  t.references :business, null: false, foreign_key: true
  t.string :name, null: false
  t.string :address
  t.string :phone
  t.string :logo_url
  t.string :google_review_url
  t.string :yelp_url
  t.string :facebook_url
  t.string :trustpilot_url
  t.string :tripadvisor_url
  t.boolean :active, default: true
  t.timestamps
end
```

### Feedback Table
```ruby
create_table :feedbacks do |t|
  t.references :location, null: false, foreign_key: true
  t.references :business, null: false, foreign_key: true
  t.integer :rating, null: false
  t.text :comment
  t.string :customer_name
  t.string :customer_email
  t.string :customer_phone
  t.string :type # 'feedback' or 'suggestion'
  t.boolean :resolved, default: false
  t.timestamps
end
```

### Opt-ins Table
```ruby
create_table :opt_ins do |t|
  t.references :location, foreign_key: true
  t.references :business, null: false, foreign_key: true
  t.string :name, null: false
  t.string :email, null: false
  t.string :phone
  t.timestamps
end
```

---

## 🔧 Environment Variables (Railway)

### Required
```bash
# Rails
RAILS_ENV=production
RAILS_MASTER_KEY=your_master_key
SECRET_KEY_BASE=generate_with_rails_secret

# Database (Railway auto-provides this)
DATABASE_URL=postgresql://...

# Authentication
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
JWT_SECRET=generate_random_string

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Resend
RESEND_API_KEY=re_xxx

# Frontend
FRONTEND_URL=https://feedback-page.com

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_BUCKET=feedback-page-production
```

---

## 🚂 Railway Deployment Steps

### 1. Create New Project
```bash
railway login
railway init
```

### 2. Add PostgreSQL
```bash
railway add postgresql
```

### 3. Set Environment Variables
Use Railway dashboard to add all environment variables above

### 4. Deploy
```bash
git push railway main
```

### 5. Run Migrations
```bash
railway run rails db:migrate
```

---

## 🔐 CORS Setup (CRITICAL)

**Without this, frontend can't call your API!**

```ruby
# Gemfile
gem 'rack-cors'

# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV['FRONTEND_URL'] || 'http://localhost:5173'
    resource '/api/*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options],
      credentials: true
  end
end
```

---

## 📁 File Upload Setup

**Use Active Storage + AWS S3:**

```bash
rails active_storage:install
rails db:migrate
```

```ruby
# config/storage.yml
amazon:
  service: S3
  access_key_id: <%= ENV['AWS_ACCESS_KEY_ID'] %>
  secret_access_key: <%= ENV['AWS_SECRET_ACCESS_KEY'] %>
  region: <%= ENV['AWS_REGION'] %>
  bucket: <%= ENV['AWS_BUCKET'] %>

# config/environments/production.rb
config.active_storage.service = :amazon
```

```ruby
# app/controllers/api/locations_controller.rb
def upload_logo
  location = Location.find(params[:id])
  location.logo.attach(params[:logo])
  
  render json: { 
    logo_url: url_for(location.logo) 
  }
end
```

---

## 🧪 Testing Your API

### Use curl or Postman:

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test forgot password (NEW)
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test protected endpoint
curl -X GET http://localhost:3000/api/locations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📚 Key Documentation Files

**Read These First:**
1. `/COMPREHENSIVE_FRONTEND_ANALYSIS.md` - Complete overview
2. `/FRONTEND_ANALYSIS_AND_BACKEND_NOTES.md` - Detailed integration guide
3. `/ADMIN_API_SPEC.md` - API specifications
4. `/email-templates/README.md` - Email implementation

**Reference:**
5. `/RAILS_INTEGRATION_GUIDE.md` - Rails-specific guide
6. `/email-templates/VARIABLES_REFERENCE.md` - Email variables

---

## ⚠️ CRITICAL: Password Reset Flow (NEW)

**This was JUST added to the frontend. You MUST implement these 3 endpoints before launch:**

### 1. Forgot Password Flow
```ruby
# When user clicks "Forgot password?" on login page:
# 1. User enters email → POST /api/auth/forgot-password
# 2. Backend generates token, sends email
# 3. User clicks link in email → redirects to /reset-password?token=xxx
# 4. User enters new password → POST /api/auth/reset-password
# 5. Backend validates token, updates password
# 6. User redirected to login
```

### 2. Email Verification Flow
```ruby
# When user signs up with email/password:
# 1. Create user with email_verified: false
# 2. Generate verification token
# 3. Send email with link to /email-verification?token=xxx
# 4. User clicks link → GET /api/auth/verify-email?token=xxx
# 5. Backend marks email_verified: true
# 6. User redirected to dashboard
```

**Frontend Pages:** Already created and waiting for your API!
- `/forgot-password`
- `/reset-password`  
- `/email-verification`

---

## 🎯 Week 1 Sprint Plan

### Day 1-2: Foundation
- [ ] Create Rails app: `rails new feedback-page --api --database=postgresql`
- [ ] Set up models and migrations
- [ ] Deploy to Railway
- [ ] Configure PostgreSQL

### Day 3-4: Authentication
- [ ] Implement email/password auth with JWT
- [ ] **Implement forgot password flow** (NEW - CRITICAL)
- [ ] **Implement email verification** (NEW - CRITICAL)
- [ ] Set up Google OAuth
- [ ] Test login flow

### Day 5-6: Core API
- [ ] Locations CRUD
- [ ] Feedback submission
- [ ] Business management
- [ ] File upload for logos

### Day 7: Integrations
- [ ] Stripe checkout
- [ ] Stripe webhooks
- [ ] Resend email setup
- [ ] Send welcome email on signup

---

## 🆘 Common Issues & Solutions

### Issue: CORS errors
**Solution:** Check CORS configuration, ensure `credentials: true`

### Issue: OAuth redirect fails
**Solution:** Check `FRONTEND_URL` environment variable

### Issue: Emails not sending
**Solution:** Verify `RESEND_API_KEY`, check Resend dashboard

### Issue: File upload fails
**Solution:** Check AWS credentials, S3 bucket permissions

### Issue: 404 on API calls
**Solution:** Check API base URL in frontend `/src/app/api/client.ts`

---

## 📞 Need Help?

### Frontend Questions
- Check React Router docs
- Review existing components for patterns

### Backend Questions
- See comprehensive documentation in `/`
- Search for `TODO:` in codebase to see what's expected

### Email Questions
- See `/email-templates/README.md`
- All templates have `{{variable}}` placeholders

---

## ✅ Quick Win: Test the Frontend

```bash
# Clone repo
git clone <repo-url>
cd feedback-page-frontend

# Install and run
npm install
npm run dev

# Visit http://localhost:5173
# Click around - everything works except API calls!
```

---

## 🎉 You're Ready!

**What you have:**
- ✅ 39 complete frontend pages
- ✅ 20 email templates
- ✅ Complete documentation
- ✅ Clear API specifications
- ✅ Mock data showing expected responses

**What you need to do:**
- Build Rails API with 41 endpoints
- Set up Google OAuth
- Configure Stripe
- Implement Resend emails
- Deploy to Railway

**Estimated Time:** 5-7 days for experienced Rails developer

**Go build! 🚀**

---

**Questions?** Check `/COMPREHENSIVE_FRONTEND_ANALYSIS.md` for complete details.

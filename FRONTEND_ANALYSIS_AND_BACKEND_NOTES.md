# Frontend Comprehensive Analysis & Backend Integration Notes

**Last Updated:** March 11, 2026  
**For:** Rails Backend Developer deploying on Railway  
**Frontend Stack:** React + TypeScript + Vite + React Router + Tailwind CSS

---

## 🎯 Executive Summary

### ✅ What's Complete
- **20+ fully functional pages** with proper routing
- **Complete Admin Portal** with dashboard, users, locations, feedback, analytics
- **User Dashboard** with multi-location support, feedback management, billing
- **Customer-facing pages** (rating flow, feedback forms, thank you pages)
- **30+ email templates** ready for Resend API integration
- **SEO optimization** with meta tags, sitemap, robots.txt
- **Responsive design** across all devices
- **Mock data layer** ready to be replaced with real API calls

### ⚠️ What Needs Backend Integration
- All admin panel functionality (currently using mock data)
- Authentication (Google OAuth + email/password)
- Stripe payment processing
- File uploads (location logos)
- CSV exports
- Email sending via Resend
- Forgot password / Password reset flow
- Real-time feedback notifications

---

## 📊 Complete Page Inventory

### Public Pages (No Auth Required)
1. ✅ **/** - Landing page with hero, features, pricing preview
2. ✅ **/pricing** - Full pricing page with Stripe integration hooks
3. ✅ **/features** - Features overview
4. ✅ **/how-it-works** - Explanation of the service
5. ✅ **/contact-us** - Contact form
6. ✅ **/privacy** - Privacy policy
7. ✅ **/terms** - Terms of service
8. ✅ **/terms-of-service** - Alias for /terms

### Authentication Pages
9. ✅ **/login** - Login/Signup with Google OAuth button + email/password
   - **Backend Hook:** `window.location.href = '/auth/google_oauth2'`
   - **Backend Needed:** POST `/api/auth/login`, POST `/api/auth/signup`

### Customer Feedback Flow
10. ✅ **/demo** - Demo rating page (no location required)
11. ✅ **/l/:locationId** - Location-specific rating page
12. ✅ **/feedback** - Negative feedback form (1-3 stars)
13. ✅ **/thank-you** - Thank you page for 4-5 star ratings
14. ✅ **/opt-in** - Newsletter/rewards opt-in page
15. ✅ **/feedback-submitted** - Confirmation page after feedback
16. ✅ **/suggestion** - Suggestion form
17. ✅ **/suggestion-submitted** - Confirmation page after suggestion

### Onboarding (Auth Required)
18. ✅ **/onboarding** - Multi-step onboarding flow for new users
    - Collects business info, review platform links, creates first location

### User Dashboard (Auth Required)
19. ✅ **/dashboard** - Main dashboard overview with analytics
20. ✅ **/dashboard/locations/new** - Add new location
21. ✅ **/dashboard/locations/edit/:locationId** - Edit location
22. ✅ **/dashboard/locations/:locationId** - Location-specific stats
23. ✅ **/dashboard/plans** - View/upgrade plans
24. ✅ **/dashboard/cancel-plan** - Cancel subscription flow
25. ✅ **/dashboard/contact-support** - Support form
26. ✅ **/dashboard/trial-expired** - Trial expiration page

### Admin Portal (Admin Auth Required)
27. ✅ **/admin/login** - Admin login (separate from user login)
28. ✅ **/admin** - Admin dashboard with platform-wide stats
29. ✅ **/admin/users** - User management (list, search, filter)
30. ✅ **/admin/users/:userId** - Individual user detail page
31. ✅ **/admin/locations** - All locations across platform
32. ✅ **/admin/locations/:locationId** - Individual location detail
33. ✅ **/admin/feedback** - All feedback across platform
34. ✅ **/admin/analytics** - Platform-wide analytics
35. ✅ **/admin/settings** - Admin settings

### Error Pages
36. ✅ **404** - Not found page

---

## 🚨 Critical Missing Functionality

### 1. ❌ **Forgot Password / Password Reset Pages**

**Status:** Email template exists, but NO frontend pages

**What's Missing:**
- `/forgot-password` - Page to enter email
- `/reset-password` - Page with token to set new password
- `/password-reset-success` - Confirmation page

**Backend API Needed:**
```ruby
POST /api/auth/forgot-password
  params: { email: string }
  returns: { message: "Password reset email sent" }

POST /api/auth/reset-password
  params: { token: string, password: string, password_confirmation: string }
  returns: { message: "Password reset successful" }
```

**Action Required:** Create these pages before launch

---

### 2. ❌ **Email Verification Page**

**Status:** Email template exists, but NO landing page after clicking verify link

**What's Missing:**
- `/verify-email` - Page that receives token and verifies email
- Success/failure feedback

**Backend API Needed:**
```ruby
GET /api/auth/verify-email?token=xyz
  returns: { success: true, message: "Email verified" }
```

**Action Required:** Create this page before launch

---

### 3. ⚠️ **File Upload Functionality**

**Current Status:** Logo upload in EditLocationPage uses local preview only

**File:** `/src/app/components/dashboard/EditLocationPage.tsx` (Line 126)

```typescript
// TODO: Implement actual file upload to Supabase Storage
// For now, we'll use the preview URL (in production, upload to storage)
finalLogoUrl = logoPreview;
```

**Backend API Needed:**
```ruby
POST /api/locations/:id/upload-logo
  params: multipart/form-data { logo: File }
  returns: { logo_url: "https://storage.../logo.png" }
```

**Options for Storage:**
1. AWS S3
2. Cloudinary
3. Active Storage with S3 backend
4. Railway's volume storage (not recommended for production)

---

### 4. ⚠️ **CSV Export Functionality**

**Missing in 5 places:**

1. **Admin Users Export** - `/src/app/components/admin/AdminUsersPage.tsx:172`
2. **Admin Locations Export** - `/src/app/components/admin/AdminLocationsPage.tsx:134`
3. **Admin Feedback Export** - `/src/app/components/admin/AdminFeedbackPage.tsx:164`
4. **Admin Analytics Export** - `/src/app/components/admin/AdminAnalyticsPage.tsx:117`
5. **User Dashboard Opt-ins Export** - Referenced but not implemented

**Backend API Needed:**
```ruby
GET /api/admin/users/export.csv
GET /api/admin/locations/export.csv
GET /api/admin/feedback/export.csv
GET /api/admin/analytics/export.csv
GET /api/locations/:id/opt-ins/export.csv
```

**Implementation:** Use Ruby CSV library or gem like `csv` or `caxlsx` for Excel

---

### 5. ⚠️ **Delete Feedback Functionality**

**Location:** `/src/app/components/dashboard/SettingsPanel.tsx:242`

```typescript
// TODO: Implement delete feedback functionality
alert('Delete feedback functionality will be implemented');
```

**Backend API Needed:**
```ruby
DELETE /api/locations/:id/feedback
  params: { confirm: true }
  returns: { message: "All feedback deleted", count: 23 }
```

---

## 🔌 Backend API Integration Points

### Current API Client Configuration

**File:** `/src/app/api/client.ts`

**Current Base URL:** Points to Supabase Functions (needs to be changed)

```typescript
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6b2adf01`;
```

**Action Required:** Update to your Rails API URL

```typescript
// For Railway deployment
const API_BASE = process.env.VITE_API_URL || 'https://your-app.railway.app/api';

// For development
// const API_BASE = 'http://localhost:3000/api';
```

---

### API Endpoints Required (Complete List)

#### Authentication
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/forgot-password          ⚠️ NOT IMPLEMENTED IN FRONTEND
POST   /api/auth/reset-password           ⚠️ NOT IMPLEMENTED IN FRONTEND
GET    /api/auth/verify-email             ⚠️ NOT IMPLEMENTED IN FRONTEND
GET    /auth/google_oauth2                (OmniAuth callback)
GET    /auth/google_oauth2/callback       (OmniAuth callback)
```

#### Business/User
```
POST   /api/business
GET    /api/business/:id
PUT    /api/business/:id
```

#### Locations
```
GET    /api/locations
GET    /api/locations/:id
POST   /api/locations
PUT    /api/locations/:id
DELETE /api/locations/:id
POST   /api/locations/:id/upload-logo     ⚠️ NOT IMPLEMENTED
GET    /api/locations/:id/opt-ins/export.csv  ⚠️ NOT IMPLEMENTED
DELETE /api/locations/:id/feedback        ⚠️ NOT IMPLEMENTED
```

#### Feedback
```
POST   /api/feedback
GET    /api/business/:id/feedback
PUT    /api/feedback/:id/mark-resolved
```

#### Opt-ins
```
POST   /api/opt-in
GET    /api/business/:id/opt-ins
```

#### Stripe/Billing
```
POST   /api/stripe/create-checkout-session
POST   /api/stripe/create-portal-session
POST   /api/stripe/cancel-subscription    ⚠️ NOT FULLY IMPLEMENTED
POST   /api/webhooks/stripe
```

#### Admin
```
POST   /api/admin/login
GET    /api/admin/dashboard
GET    /api/admin/users
GET    /api/admin/users/:id
GET    /api/admin/users/export.csv        ⚠️ NOT IMPLEMENTED
GET    /api/admin/locations
GET    /api/admin/locations/:id
POST   /api/admin/locations/:id/deactivate  ⚠️ NOT IMPLEMENTED
GET    /api/admin/locations/export.csv    ⚠️ NOT IMPLEMENTED
GET    /api/admin/feedback
GET    /api/admin/feedback/export.csv     ⚠️ NOT IMPLEMENTED
GET    /api/admin/analytics
GET    /api/admin/analytics/export.csv    ⚠️ NOT IMPLEMENTED
GET    /api/admin/settings
PUT    /api/admin/settings
```

---

## 🔐 Authentication Flow

### Google OAuth (Primary Method)

**Frontend Button:** `/src/app/components/LoginPage.tsx:43`

```typescript
const handleGoogleSignIn = () => {
  // This will redirect to Rails backend OAuth endpoint
  window.location.href = '/auth/google_oauth2';
};
```

**Rails Setup Required:**

1. **Install Gems:**
```ruby
# Gemfile
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'omniauth-rails_csrf_protection'
```

2. **Configure OmniAuth:**
```ruby
# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, 
    ENV['GOOGLE_CLIENT_ID'],
    ENV['GOOGLE_CLIENT_SECRET'],
    {
      scope: 'email,profile',
      prompt: 'select_account',
      callback_path: '/auth/google_oauth2/callback'
    }
end
```

3. **Routes:**
```ruby
# config/routes.rb
get '/auth/google_oauth2/callback', to: 'sessions#google_callback'
get '/auth/failure', to: 'sessions#auth_failure'
```

4. **Controller:**
```ruby
# app/controllers/sessions_controller.rb
def google_callback
  auth = request.env['omniauth.auth']
  user = User.from_omniauth(auth)
  session[:user_id] = user.id
  
  # Check if user needs onboarding
  if user.business.nil?
    redirect_to '/onboarding'
  else
    redirect_to '/dashboard'
  end
end
```

### Email/Password Authentication

**Frontend:** Uses `AuthContext` in `/src/app/contexts/AuthContext.tsx`

**Currently:** Mock implementation - Replace with actual API calls

```typescript
const signIn = async (email: string, password: string) => {
  // TODO: Replace with actual API call
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error('Invalid credentials');
  
  const data = await response.json();
  setUser(data.user);
  localStorage.setItem('auth_token', data.token);
};
```

---

## 💳 Stripe Integration

### Current Implementation

**File:** `/src/app/components/PricingPage.tsx`

**Stripe Publishable Key:** Uses environment variable

```typescript
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
```

**Environment Variables Needed:**
```bash
# .env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Backend Environment Variables:**
```bash
# Rails .env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Checkout Flow

**Frontend Request:**
```typescript
const response = await fetch('/api/stripe/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_xxx',
    planId: 'pro',
    billingPeriod: 'monthly'
  })
});

const { sessionId } = await response.json();
const stripe = await stripePromise;
stripe.redirectToCheckout({ sessionId });
```

**Backend Needed:**
```ruby
# app/controllers/api/stripe_controller.rb
def create_checkout_session
  session = Stripe::Checkout::Session.create({
    customer_email: current_user.email,
    payment_method_types: ['card'],
    line_items: [{
      price: params[:priceId],
      quantity: 1
    }],
    mode: 'subscription',
    success_url: "#{ENV['FRONTEND_URL']}/dashboard?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "#{ENV['FRONTEND_URL']}/pricing"
  })
  
  render json: { sessionId: session.id }
end
```

### Stripe Webhook Handler

**Endpoint:** `POST /api/webhooks/stripe`

**Events to Handle:**
- `checkout.session.completed` - Subscription created
- `customer.subscription.updated` - Plan changed
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Payment successful
- `invoice.payment_failed` - Payment failed

**Example:**
```ruby
def stripe_webhook
  payload = request.body.read
  sig_header = request.env['HTTP_STRIPE_SIGNATURE']
  event = Stripe::Webhook.construct_event(payload, sig_header, ENV['STRIPE_WEBHOOK_SECRET'])
  
  case event.type
  when 'checkout.session.completed'
    session = event.data.object
    user = User.find_by(email: session.customer_email)
    user.update(
      stripe_customer_id: session.customer,
      subscription_status: 'active',
      plan: session.metadata.plan_id
    )
    # Send welcome email
  when 'invoice.payment_failed'
    # Send payment failed email
  end
  
  head :ok
end
```

---

## 📧 Email Integration with Resend

### Email Templates Location
`/email-templates/` - 20 production-ready HTML email templates

**Categories:**
- Authentication (3): welcome, email verification, password reset
- Trial Management (5): 15, 7, 3, 1 day reminders, expired
- Billing (7): payment success, payment failed, upgraded, cancelled, etc.
- Feedback (3): new feedback, new suggestion, new opt-in
- Customer (2): feedback confirmation, opt-in welcome

### Resend Setup

**Gem:** Add to Gemfile
```ruby
gem 'resend'
```

**Configuration:**
```ruby
# config/initializers/resend.rb
Resend.api_key = ENV['RESEND_API_KEY']
```

**Example Mailer:**
```ruby
# app/mailers/auth_mailer.rb
class AuthMailer < ApplicationMailer
  def welcome_email(user)
    template = File.read(Rails.root.join('email-templates/auth/welcome.html'))
    
    # Replace variables
    html_body = template
      .gsub('{{business_name}}', user.business_name)
      .gsub('{{dashboard_url}}', dashboard_url)
    
    Resend::Emails.send(
      from: 'notifications@feedback-page.com',
      to: user.email,
      subject: 'Welcome to Feedback Page! 🎉',
      html: html_body
    )
  end
end
```

**See complete documentation:**
- `/email-templates/README.md`
- `/email-templates/VARIABLES_REFERENCE.md`

---

## 🚂 Railway Deployment Notes

### Environment Variables Required

```bash
# Rails
RAILS_ENV=production
RAILS_MASTER_KEY=xxx
SECRET_KEY_BASE=xxx

# Database (Railway provides this automatically)
DATABASE_URL=postgresql://...

# Authentication
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
JWT_SECRET=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# Frontend URL (for OAuth callbacks)
FRONTEND_URL=https://feedback-page.com

# File Storage (if using S3)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_BUCKET=feedback-page-production
```

### Railway Configuration

**Create `railway.json` in root:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "bundle install && rails assets:precompile"
  },
  "deploy": {
    "startCommand": "rails db:migrate && rails server -b 0.0.0.0 -p $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Dockerfile (Alternative to Nixpacks)

```dockerfile
FROM ruby:3.2

WORKDIR /app

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy app
COPY . .

# Precompile assets
RUN rails assets:precompile

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
```

### Database Setup

Railway provides PostgreSQL automatically. Your `database.yml`:

```yaml
production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %>
```

### Static Asset Serving

**Option 1: Rails serves React (Recommended)**

Build React app and copy to Rails public directory:
```bash
npm run build
cp -r dist/* /path/to/rails/public/
```

Rails will serve static files from `public/` automatically.

**Option 2: Separate deployments**

Deploy React frontend separately (Vercel, Netlify) and point API calls to Railway backend.

---

## 🐛 Known Issues & Workarounds

### 1. Mock Data in Admin Panel

**Issue:** All admin pages use hardcoded mock data

**Files Affected:**
- `/src/app/components/admin/AdminDashboard.tsx:56`
- `/src/app/components/admin/AdminUsersPage.tsx:41`
- `/src/app/components/admin/AdminLocationsPage.tsx:41`
- `/src/app/components/admin/AdminFeedbackPage.tsx:45`
- `/src/app/components/admin/AdminAnalyticsPage.tsx:60`
- `/src/app/components/admin/AdminUserDetail.tsx:63`
- `/src/app/components/admin/AdminLocationDetail.tsx:76`

**Search for:** `TODO: Replace with actual API call`

**Fix:** Replace mock data with actual `fetch()` calls to your Rails API

### 2. Trial Banner Always Shows

**Issue:** Trial banner in dashboard always shows "15 days left"

**File:** `/src/app/components/dashboard/TrialBanner.tsx`

**Fix:** Replace hardcoded `daysLeft={15}` with actual calculation from backend user data

### 3. Logo Upload Not Functional

**Issue:** Location logo upload shows preview but doesn't actually upload file

**File:** `/src/app/components/dashboard/EditLocationPage.tsx:126`

**Fix:** Implement multipart/form-data upload to your file storage solution

### 4. Settings Save Doesn't Persist

**Issue:** Location settings save shows success but doesn't persist

**File:** `/src/app/components/dashboard/SettingsPanel.tsx:79`

**Fix:** Implement PUT `/api/locations/:id/settings` endpoint

---

## ✅ Pre-Launch Checklist for Backend Developer

### Critical (Must-Have for Launch)

- [ ] Create **Forgot Password** page (`/forgot-password`)
- [ ] Create **Reset Password** page (`/reset-password?token=xxx`)
- [ ] Create **Email Verification** page (`/verify-email?token=xxx`)
- [ ] Implement **Google OAuth** with OmniAuth
- [ ] Set up **Stripe webhooks** handler
- [ ] Configure **Resend** for email sending
- [ ] Implement **file upload** for location logos
- [ ] Replace all **mock data** in admin panel with real API calls
- [ ] Update **API base URL** in `/src/app/api/client.ts`
- [ ] Set up **environment variables** in Railway
- [ ] Configure **CORS** to allow frontend domain
- [ ] Test **payment flow** end-to-end with Stripe test mode
- [ ] Test **OAuth flow** with Google test credentials
- [ ] Set up **database migrations**
- [ ] Deploy **PostgreSQL** database on Railway

### High Priority

- [ ] Implement **CSV exports** for all admin tables
- [ ] Add **Delete All Feedback** functionality
- [ ] Create **admin authentication** (separate from user auth)
- [ ] Set up **trial expiration** background job
- [ ] Implement **email notification** triggers
- [ ] Add **rate limiting** to prevent abuse
- [ ] Set up **error tracking** (Sentry, Rollbar, etc.)
- [ ] Configure **logging** for production
- [ ] Add **health check** endpoint for Railway
- [ ] Test **multi-location** functionality

### Nice-to-Have

- [ ] Implement **weekly feedback digest** emails
- [ ] Add **team member** invitations
- [ ] Create **API documentation** with Swagger
- [ ] Set up **staging environment** on Railway
- [ ] Add **feature flags** for gradual rollout
- [ ] Implement **data export** (GDPR compliance)
- [ ] Add **webhook notifications** for third-party integrations
- [ ] Create **admin activity log**

---

## 📝 Code Snippets for Common Tasks

### Update API Base URL

**File:** `/src/app/api/client.ts:4`

```typescript
// Replace this:
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6b2adf01`;

// With this:
const API_BASE = import.meta.env.VITE_API_URL || 'https://feedback-page-production.up.railway.app/api';
```

### Enable CORS in Rails

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

### Example Auth Controller

```ruby
# app/controllers/api/auth_controller.rb
class Api::AuthController < ApplicationController
  skip_before_action :authenticate_user!, only: [:login, :signup]
  
  def signup
    user = User.new(user_params)
    
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { 
        user: user.as_json(only: [:id, :email, :name]), 
        token: token 
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def login
    user = User.find_by(email: params[:email])
    
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { 
        user: user.as_json(only: [:id, :email, :name, :business_id]), 
        token: token 
      }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
  
  def me
    render json: current_user.as_json(
      include: { business: { include: :locations } }
    )
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end
end
```

---

## 🎨 Frontend Build Process

### Development

```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

### Production Build

```bash
npm run build
# Creates /dist folder with:
#   - index.html
#   - /assets/*.js
#   - /assets/*.css
#   - /assets/images
```

### Copy to Rails

```bash
# Manual copy
cp -r dist/* ../rails-app/public/

# Or use automated script
chmod +x build-for-rails.sh
./build-for-rails.sh
```

---

## 🔍 Testing the Integration

### 1. Test API Endpoints

Use Postman or curl:

```bash
# Test auth
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test locations
curl -X GET http://localhost:3000/api/locations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Test OAuth Flow

1. Start Rails server: `rails s`
2. Visit: `http://localhost:3000/auth/google_oauth2`
3. Should redirect to Google login
4. After success, should redirect to `/onboarding` or `/dashboard`

### 3. Test Stripe Integration

1. Use Stripe test mode keys
2. Test card: `4242 4242 4242 4242`
3. Verify webhook events in Stripe dashboard
4. Check user subscription status in database

### 4. Test Email Sending

```ruby
# Rails console
AuthMailer.welcome_email(User.first).deliver_now
```

Check Resend dashboard for delivery status.

---

## 📚 Additional Resources

### Documentation Files in This Project

1. `/RAILS_INTEGRATION_GUIDE.md` - Rails deployment guide
2. `/ADMIN_API_SPEC.md` - Complete API specification
3. `/PRODUCTION_READY_CHECKLIST.md` - Pre-launch checklist
4. `/email-templates/README.md` - Email implementation guide
5. `/email-templates/VARIABLES_REFERENCE.md` - Email variables

### External Resources

- **Railway Docs:** https://docs.railway.app/
- **OmniAuth Google:** https://github.com/zquestz/omniauth-google-oauth2
- **Stripe Ruby:** https://stripe.com/docs/api/ruby
- **Resend Ruby:** https://resend.com/docs/send-with-ruby

---

## 🆘 Support & Questions

### For Frontend Issues

Contact the frontend team or check:
- React Router v7 docs: https://reactrouter.com/
- Tailwind CSS: https://tailwindcss.com/

### For Backend Integration

Refer to:
- `/ADMIN_API_SPEC.md` for complete API specification
- TODO comments in code (search for `TODO:`)
- Mock data structures for expected API responses

---

## 🎯 Quick Start Commands for Cursor

### Setup
```bash
# Clone and install
cd feedback-page-backend
bundle install
rails db:create db:migrate

# Set environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Development
```bash
# Start Rails
rails s

# In separate terminal, start frontend
cd ../feedback-page-frontend
npm run dev
```

### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

---

**Created for:** Backend developer deploying to Railway  
**Last Updated:** March 11, 2026  
**Questions?** Check the documentation files or search for `TODO:` comments in the code.

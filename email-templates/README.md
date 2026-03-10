# Feedback Page Email Templates

This directory contains all email templates for the Feedback Page application. These templates are designed to be used with Resend API in your Rails backend.

## Directory Structure

```
email-templates/
├── auth/                   # Authentication & onboarding emails
│   ├── welcome.html
│   ├── email-verification.html
│   └── password-reset.html
├── trial/                  # Trial management emails
│   ├── trial-15-days.html
│   ├── trial-7-days.html
│   ├── trial-3-days.html
│   ├── trial-last-day.html
│   └── trial-expired.html
├── billing/                # Billing & subscription emails
│   ├── payment-successful-first.html
│   ├── payment-successful-recurring.html
│   ├── payment-failed.html
│   ├── subscription-upgraded.html
│   └── subscription-cancelled.html
├── feedback/               # Feedback notification emails (to business owners)
│   ├── new-negative-feedback.html
│   ├── new-suggestion.html
│   └── new-optin.html
├── customer/               # Customer-facing emails
│   ├── feedback-confirmation.html
│   └── optin-confirmation.html
└── README.md              # This file
```

## Implementation with Resend

### Setup

1. Install Resend gem:
```ruby
gem 'resend'
```

2. Configure Resend in `config/initializers/resend.rb`:
```ruby
Resend.api_key = ENV['RESEND_API_KEY']
```

3. Set up mailers in your Rails app

### Example Mailer Implementation

```ruby
# app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: 'notifications@feedback-page.com'
  layout false # We're using full HTML templates
  
  private
  
  def render_template(template_name, variables = {})
    template_path = Rails.root.join('email-templates', "#{template_name}.html")
    template = File.read(template_path)
    
    # Replace variables in template
    variables.each do |key, value|
      template.gsub!("{{#{key}}}", value.to_s)
    end
    
    template
  end
end
```

```ruby
# app/mailers/auth_mailer.rb
class AuthMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    
    variables = {
      business_name: user.business_name,
      dashboard_url: dashboard_url,
      help_url: help_url
    }
    
    mail(
      to: user.email,
      subject: 'Welcome to Feedback Page! 🎉',
      html: render_template('auth/welcome', variables)
    )
  end
  
  def password_reset(user, reset_token)
    variables = {
      user_name: user.name,
      reset_url: password_reset_url(token: reset_token)
    }
    
    mail(
      to: user.email,
      subject: 'Reset Your Password',
      html: render_template('auth/password-reset', variables)
    )
  end
end
```

## Template Variables

### Authentication Templates

#### `auth/welcome.html`
- `{{business_name}}` - The name of the business
- `{{dashboard_url}}` - Link to dashboard
- `{{help_url}}` - Link to help documentation

#### `auth/email-verification.html`
- `{{verification_url}}` - Email verification link (with token)

#### `auth/password-reset.html`
- `{{user_name}}` - User's name
- `{{reset_url}}` - Password reset link (with token)

---

### Trial Management Templates

#### `trial/trial-15-days.html`
- `{{business_name}}` - Business name
- `{{feedback_count}}` - Number of feedback items received
- `{{avg_rating}}` - Average rating (e.g., "4.2")
- `{{pricing_url}}` - Link to pricing page

#### `trial/trial-7-days.html`
- `{{business_name}}` - Business name
- `{{trial_end_date}}` - Date trial ends (formatted, e.g., "March 20, 2026")
- `{{pricing_url}}` - Link to pricing page

#### `trial/trial-3-days.html`
- `{{business_name}}` - Business name
- `{{trial_end_date}}` - Date trial ends (formatted)
- `{{feedback_count}}` - Number of feedback items
- `{{pricing_url}}` - Link to pricing page

#### `trial/trial-last-day.html`
- `{{business_name}}` - Business name
- `{{feedback_count}}` - Number of feedback items
- `{{optin_count}}` - Number of newsletter signups
- `{{pricing_url}}` - Link to pricing page
- `{{starter_url}}` - Direct link to subscribe to Starter plan
- `{{professional_url}}` - Direct link to subscribe to Professional plan

#### `trial/trial-expired.html`
- `{{business_name}}` - Business name
- `{{cancellation_date}}` - When trial was cancelled
- `{{access_end_date}}` - When access ended
- `{{deletion_date}}` - When data will be deleted (30 days after access end)
- `{{pricing_url}}` - Link to pricing page

---

### Billing Templates

#### `billing/payment-successful-first.html`
- `{{business_name}}` - Business name
- `{{plan_name}}` - Plan name (e.g., "Starter", "Professional")
- `{{price}}` - Price (e.g., "$29")
- `{{billing_cycle}}` - Billing cycle (e.g., "month", "year")
- `{{next_billing_date}}` - Next billing date (formatted)
- `{{invoice_number}}` - Invoice number
- `{{payment_date}}` - Payment date (formatted)
- `{{payment_method}}` - Payment method (e.g., "Visa ending in 4242")
- `{{amount}}` - Amount charged (e.g., "$29.00")
- `{{dashboard_url}}` - Link to dashboard
- `{{invoice_url}}` - Link to download PDF invoice
- `{{billing_url}}` - Link to billing settings

#### `billing/payment-successful-recurring.html`
- `{{business_name}}` - Business name
- `{{plan_name}}` - Plan name
- `{{invoice_number}}` - Invoice number
- `{{payment_date}}` - Payment date
- `{{payment_method}}` - Payment method
- `{{billing_period}}` - Billing period (e.g., "Mar 1 - Mar 31, 2026")
- `{{amount}}` - Amount charged
- `{{next_billing_date}}` - Next billing date
- `{{invoice_url}}` - Link to invoice
- `{{billing_url}}` - Link to billing history

#### `billing/payment-failed.html`
- `{{business_name}}` - Business name
- `{{amount}}` - Amount due
- `{{payment_method}}` - Payment method that failed
- `{{failure_reason}}` - Reason for failure (e.g., "Insufficient funds", "Card expired")
- `{{grace_period_end}}` - Date when account will be suspended
- `{{update_payment_url}}` - Link to update payment method

#### `billing/subscription-upgraded.html`
- `{{business_name}}` - Business name
- `{{new_plan_name}}` - New plan name
- `{{old_plan_name}}` - Previous plan name
- `{{old_price}}` - Previous price
- `{{new_price}}` - New price
- `{{prorated_amount}}` - Prorated charge amount
- `{{next_billing_date}}` - Next billing date
- `{{feature_1}}`, `{{feature_2}}`, `{{feature_3}}` - New features unlocked
- `{{dashboard_url}}` - Link to dashboard

#### `billing/subscription-cancelled.html`
- `{{business_name}}` - Business name
- `{{plan_name}}` - Cancelled plan name
- `{{cancellation_date}}` - Cancellation date
- `{{access_end_date}}` - When access ends
- `{{deletion_date}}` - When data will be deleted
- `{{reactivate_url}}` - Link to reactivate subscription
- `{{export_data_url}}` - Link to export data
- `{{feedback_survey_url}}` - Link to cancellation survey

---

### Feedback Notification Templates (To Business Owners)

#### `feedback/new-negative-feedback.html`
- `{{business_name}}` - Business name
- `{{rating}}` - Numeric rating (e.g., "2")
- `{{rating_stars}}` - Star representation (e.g., "⭐⭐")
- `{{customer_name}}` - Customer name (or "Anonymous" if not provided)
- `{{customer_email}}` - Customer email (or "Not provided")
- `{{customer_phone}}` - Customer phone (or "Not provided")
- `{{feedback_date}}` - Date feedback was submitted (formatted)
- `{{comment}}` - Feedback comment text
- `{{view_feedback_url}}` - Link to view feedback in dashboard
- `{{mark_resolved_url}}` - Link to mark as resolved
- `{{notification_settings_url}}` - Link to notification settings

#### `feedback/new-suggestion.html`
- `{{business_name}}` - Business name
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{suggestion_date}}` - Date submitted
- `{{suggestion_text}}` - The suggestion text
- `{{view_suggestion_url}}` - Link to view in dashboard

#### `feedback/new-optin.html`
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{customer_phone}}` - Customer phone
- `{{location_name}}` - Location name (for multi-location)
- `{{signup_date}}` - Date of signup
- `{{view_optins_url}}` - Link to view all opt-ins
- `{{export_url}}` - Link to export CSV

---

### Customer-Facing Templates

#### `customer/feedback-confirmation.html`
- `{{business_name}}` - Business name
- `{{customer_name}}` - Customer name (optional, shows "Hi" without name if not provided)
- `{{business_email}}` - Business contact email
- `{{business_phone}}` - Business phone (optional)
- `{{business_address}}` - Business address (optional)

#### `customer/optin-confirmation.html`
- `{{business_name}}` - Business name
- `{{customer_name}}` - Customer name
- `{{welcome_offer}}` - Welcome offer text (optional)
- `{{facebook_url}}` - Facebook URL (optional)
- `{{instagram_url}}` - Instagram URL (optional)
- `{{twitter_url}}` - Twitter URL (optional)
- `{{business_address}}` - Business address (optional)
- `{{business_phone}}` - Business phone (optional)
- `{{business_email}}` - Business email
- `{{unsubscribe_url}}` - Unsubscribe link

---

## Styling Notes

All templates use:
- **Black (#000000) and White (#ffffff)** color scheme
- Inline CSS for maximum email client compatibility
- Table-based layouts (best practice for email)
- Rounded corners (border-radius: 12px for main elements)
- Clean, "bubbly" design with generous padding
- Mobile-responsive (max-width: 600px)

## Testing

Before deploying, test emails using:
1. [Litmus](https://litmus.com) - For email client compatibility
2. [Email on Acid](https://www.emailonacid.com) - For rendering tests
3. Resend's preview feature

## Variable Replacement

The templates use `{{variable_name}}` syntax. Your Rails code should replace these before sending:

```ruby
def render_template(template_name, variables = {})
  template_path = Rails.root.join('email-templates', "#{template_name}.html")
  template = File.read(template_path)
  
  variables.each do |key, value|
    # Handle nil values
    value = value.present? ? value : ''
    template.gsub!("{{#{key}}}", value.to_s)
  end
  
  template
end
```

## Conditional Content

Some templates have optional sections. Handle these in your mailer:

```ruby
# For optional customer name in feedback confirmation
variables = {
  business_name: business.name,
  customer_name: feedback.customer_name.present? ? feedback.customer_name : nil,
  business_email: business.email
}

# The template will show "Hi John," if name exists, or just "Hi," if not
```

## Error Handling

Always handle missing variables gracefully:

```ruby
def safe_render_template(template_name, variables = {})
  template = render_template(template_name, variables)
  
  # Check for unreplaced variables
  if template.include?('{{')
    Rails.logger.warn "Unreplaced variables in #{template_name}: #{template.scan(/\{\{([^}]+)\}\}/).flatten}"
  end
  
  template
rescue => e
  Rails.logger.error "Failed to render template #{template_name}: #{e.message}"
  raise
end
```

## Sending with Resend

```ruby
Resend::Emails.send(
  from: 'notifications@feedback-page.com',
  to: user.email,
  subject: 'Welcome to Feedback Page!',
  html: rendered_template
)
```

## Domain Setup

Ensure you've:
1. Verified `feedback-page.com` domain in Resend
2. Set up SPF and DKIM records
3. Configured `notifications@feedback-page.com` as sending address

## Support

For questions about these templates, contact the frontend team.

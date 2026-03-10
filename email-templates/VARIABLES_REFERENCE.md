# Email Template Variables Reference

Quick reference guide for all email template variables used in Feedback Page.

## Table of Contents
- [Authentication & Onboarding](#authentication--onboarding)
- [Trial Management](#trial-management)
- [Billing & Subscriptions](#billing--subscriptions)
- [Feedback Notifications](#feedback-notifications)
- [Customer Emails](#customer-emails)

---

## Authentication & Onboarding

### `auth/welcome.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | The name of the business |
| `dashboard_url` | String | Yes | "https://feedback-page.com/dashboard" | Link to main dashboard |
| `help_url` | String | Yes | "https://feedback-page.com/help" | Link to help documentation |

### `auth/email-verification.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `verification_url` | String | Yes | "https://feedback-page.com/verify?token=abc123" | Verification link with token |

### `auth/password-reset.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `user_name` | String | Yes | "John Smith" | User's full name |
| `reset_url` | String | Yes | "https://feedback-page.com/reset?token=xyz789" | Password reset link with token |

---

## Trial Management

### `trial/trial-15-days.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `feedback_count` | Integer | Yes | "23" | Total feedback items received |
| `avg_rating` | Decimal | Yes | "4.2" | Average rating (1-5 scale) |
| `pricing_url` | String | Yes | "https://feedback-page.com/pricing" | Link to pricing page |

### `trial/trial-7-days.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `trial_end_date` | String | Yes | "March 20, 2026" | Formatted trial end date |
| `pricing_url` | String | Yes | "https://feedback-page.com/pricing" | Link to pricing page |

### `trial/trial-3-days.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `trial_end_date` | String | Yes | "March 20, 2026" | Formatted trial end date |
| `feedback_count` | Integer | Yes | "23" | Total feedback items |
| `pricing_url` | String | Yes | "https://feedback-page.com/pricing" | Link to pricing page |

### `trial/trial-last-day.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `feedback_count` | Integer | Yes | "23" | Total feedback items |
| `optin_count` | Integer | Yes | "15" | Newsletter signup count |
| `pricing_url` | String | Yes | "https://feedback-page.com/pricing" | General pricing page |
| `starter_url` | String | Yes | "https://feedback-page.com/subscribe/starter" | Direct link to Starter plan |
| `professional_url` | String | Yes | "https://feedback-page.com/subscribe/professional" | Direct link to Professional plan |

### `trial/trial-expired.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `cancellation_date` | String | Yes | "March 20, 2026" | When trial ended |
| `access_end_date` | String | Yes | "March 20, 2026" | When access ended |
| `deletion_date` | String | Yes | "April 19, 2026" | Data deletion date (30 days after end) |
| `pricing_url` | String | Yes | "https://feedback-page.com/pricing" | Link to reactivate |

---

## Billing & Subscriptions

### `billing/payment-successful-first.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `plan_name` | String | Yes | "Professional" | Plan name |
| `price` | String | Yes | "$79" | Monthly/annual price |
| `billing_cycle` | String | Yes | "month" or "year" | Billing frequency |
| `next_billing_date` | String | Yes | "April 10, 2026" | Next charge date |
| `invoice_number` | String | Yes | "INV-2026-001234" | Unique invoice number |
| `payment_date` | String | Yes | "March 10, 2026" | Current payment date |
| `payment_method` | String | Yes | "Visa ending in 4242" | Payment method used |
| `amount` | String | Yes | "$79.00" | Amount charged |
| `dashboard_url` | String | Yes | "https://feedback-page.com/dashboard" | Dashboard link |
| `invoice_url` | String | Yes | "https://feedback-page.com/invoices/001234.pdf" | PDF invoice link |
| `billing_url` | String | Yes | "https://feedback-page.com/billing" | Billing settings |

### `billing/payment-successful-recurring.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `plan_name` | String | Yes | "Starter" | Current plan name |
| `invoice_number` | String | Yes | "INV-2026-001235" | Invoice number |
| `payment_date` | String | Yes | "March 10, 2026" | Payment date |
| `payment_method` | String | Yes | "Mastercard ending in 5555" | Payment method |
| `billing_period` | String | Yes | "Mar 10 - Apr 9, 2026" | Current billing period |
| `amount` | String | Yes | "$29.00" | Amount charged |
| `next_billing_date` | String | Yes | "April 10, 2026" | Next billing date |
| `invoice_url` | String | Yes | "https://feedback-page.com/invoices/001235.pdf" | Invoice link |
| `billing_url` | String | Yes | "https://feedback-page.com/billing" | Billing settings |

### `billing/payment-failed.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `amount` | String | Yes | "$79.00" | Amount due |
| `payment_method` | String | Yes | "Visa ending in 4242" | Failed payment method |
| `failure_reason` | String | Yes | "Insufficient funds" | Reason for failure |
| `grace_period_end` | String | Yes | "March 20, 2026" | When account will suspend |
| `update_payment_url` | String | Yes | "https://feedback-page.com/billing/payment-method" | Update payment link |

### `billing/subscription-upgraded.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `new_plan_name` | String | Yes | "Professional" | New plan name |
| `old_plan_name` | String | Yes | "Starter" | Previous plan name |
| `old_price` | String | Yes | "$29/month" | Old price |
| `new_price` | String | Yes | "$79/month" | New price |
| `prorated_amount` | String | Yes | "$41.67" | Prorated charge |
| `next_billing_date` | String | Yes | "April 10, 2026" | Next billing date |
| `feature_1` | String | Yes | "Unlimited locations" | Feature unlocked |
| `feature_2` | String | Yes | "Advanced analytics" | Feature unlocked |
| `feature_3` | String | Yes | "Priority support" | Feature unlocked |
| `dashboard_url` | String | Yes | "https://feedback-page.com/dashboard" | Dashboard link |

### `billing/subscription-downgraded.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `new_plan_name` | String | Yes | "Starter" | New plan name |
| `old_plan_name` | String | Yes | "Professional" | Previous plan name |
| `old_price` | String | Yes | "$79/month" | Old price |
| `new_price` | String | Yes | "$29/month" | New price |
| `effective_date` | String | Yes | "April 10, 2026" | When changes take effect |
| `credit_amount` | String | Yes | "$41.67" | Credit applied |
| `limitation_1` | String | Yes | "Limited to 1 location" | Feature limitation |
| `limitation_2` | String | Yes | "Basic analytics only" | Feature limitation |
| `billing_url` | String | Yes | "https://feedback-page.com/billing" | Billing settings |
| `upgrade_url` | String | Yes | "https://feedback-page.com/pricing" | Link to upgrade |

### `billing/subscription-cancelled.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `plan_name` | String | Yes | "Professional" | Cancelled plan |
| `cancellation_date` | String | Yes | "March 10, 2026" | Cancellation date |
| `access_end_date` | String | Yes | "April 10, 2026" | When access ends |
| `deletion_date` | String | Yes | "May 10, 2026" | Data deletion date |
| `reactivate_url` | String | Yes | "https://feedback-page.com/reactivate" | Reactivate link |
| `export_data_url` | String | Yes | "https://feedback-page.com/export" | Export data link |
| `feedback_survey_url` | String | No | "https://feedback-page.com/survey/cancel" | Optional survey |

### `billing/renewal-reminder.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `plan_name` | String | Yes | "Professional" | Current plan |
| `renewal_date` | String | Yes | "April 10, 2026" | Renewal date |
| `payment_method` | String | Yes | "Visa ending in 4242" | Payment method |
| `amount` | String | Yes | "$79.00" | Amount to charge |
| `update_payment_url` | String | Yes | "https://feedback-page.com/billing/payment-method" | Update payment |
| `change_plan_url` | String | Yes | "https://feedback-page.com/pricing" | Change plan |
| `cancel_url` | String | Yes | "https://feedback-page.com/billing/cancel" | Cancel link |

---

## Feedback Notifications

### `feedback/new-negative-feedback.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `rating` | Integer | Yes | "2" | Numeric rating (1-5) |
| `rating_stars` | String | Yes | "⭐⭐" | Star representation |
| `customer_name` | String | No | "Sarah Johnson" or "Anonymous" | Customer name |
| `customer_email` | String | No | "sarah@example.com" or "Not provided" | Customer email |
| `customer_phone` | String | No | "(555) 123-4567" or "Not provided" | Customer phone |
| `feedback_date` | String | Yes | "March 10, 2026 at 2:30 PM" | Submission timestamp |
| `comment` | String | Yes | "Service was slow..." | Feedback text |
| `view_feedback_url` | String | Yes | "https://feedback-page.com/dashboard/feedback/123" | View in dashboard |
| `mark_resolved_url` | String | Yes | "https://feedback-page.com/dashboard/feedback/123/resolve" | Mark resolved |
| `notification_settings_url` | String | Yes | "https://feedback-page.com/settings/notifications" | Settings link |

### `feedback/new-suggestion.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `customer_name` | String | No | "Alex Rivera" | Customer name |
| `customer_email` | String | No | "alex@example.com" | Customer email |
| `suggestion_date` | String | Yes | "March 10, 2026" | Submission date |
| `suggestion_text` | String | Yes | "Add more vegan options..." | Suggestion content |
| `view_suggestion_url` | String | Yes | "https://feedback-page.com/dashboard/suggestions/456" | View in dashboard |

### `feedback/new-optin.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `customer_name` | String | Yes | "Emily Chen" | Customer name |
| `customer_email` | String | Yes | "emily@example.com" | Customer email |
| `customer_phone` | String | Yes | "(555) 987-6543" | Customer phone |
| `location_name` | String | No | "Downtown Location" | Location if multi-location |
| `signup_date` | String | Yes | "March 10, 2026" | Signup date |
| `view_optins_url` | String | Yes | "https://feedback-page.com/dashboard/optins" | View all opt-ins |
| `export_url` | String | Yes | "https://feedback-page.com/dashboard/optins/export" | Export CSV link |

---

## Customer Emails

### `customer/feedback-confirmation.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `customer_name` | String | No | "John" | Customer first name (optional) |
| `business_email` | String | Yes | "contact@joescoffee.com" | Business contact email |
| `business_phone` | String | No | "(555) 123-4567" | Business phone (optional) |
| `business_address` | String | No | "123 Main St, City" | Business address (optional) |

### `customer/optin-confirmation.html`
| Variable | Type | Required | Example | Description |
|----------|------|----------|---------|-------------|
| `business_name` | String | Yes | "Joe's Coffee Shop" | Business name |
| `customer_name` | String | Yes | "Emily" | Customer name |
| `welcome_offer` | String | No | "10% off your next visit" | Welcome offer text |
| `facebook_url` | String | No | "https://facebook.com/joescoffee" | Facebook link |
| `instagram_url` | String | No | "https://instagram.com/joescoffee" | Instagram link |
| `twitter_url` | String | No | "https://twitter.com/joescoffee" | Twitter/X link |
| `business_address` | String | No | "123 Main St" | Business address |
| `business_phone` | String | No | "(555) 123-4567" | Business phone |
| `business_email` | String | Yes | "contact@joescoffee.com" | Business email |
| `unsubscribe_url` | String | Yes | "https://feedback-page.com/unsubscribe?token=xyz" | Unsubscribe link |

---

## Common Patterns

### Date Formatting
All dates should be formatted as: `"Month Day, Year"` (e.g., "March 10, 2026")
Timestamps should be: `"Month Day, Year at HH:MM AM/PM"` (e.g., "March 10, 2026 at 2:30 PM")

### Currency Formatting
All amounts should include currency symbol: `"$XX.XX"` (e.g., "$79.00")

### URLs
All URLs should be absolute (start with https://)

### Optional Variables
When a variable is marked as "No" in Required:
- Check if value exists before including in variables hash
- Template handles the conditional display
- Empty strings are acceptable for some templates

### Star Ratings
Generate star ratings like this:
```ruby
def generate_stars(rating)
  "⭐" * rating
end
```

---

## Rails Implementation Example

```ruby
# app/mailers/trial_mailer.rb
class TrialMailer < ApplicationMailer
  def trial_15_days_reminder(user)
    variables = {
      business_name: user.business_name,
      feedback_count: user.feedback.count.to_s,
      avg_rating: user.average_rating.round(1).to_s,
      pricing_url: pricing_url
    }
    
    mail(
      to: user.email,
      subject: 'Your Trial is Going Great! 🚀',
      html: render_template('trial/trial-15-days', variables)
    )
  end
end
```

## Testing Variables

Create a fixtures file for testing:

```ruby
# test/fixtures/email_variables.yml
welcome:
  business_name: "Test Business"
  dashboard_url: "http://localhost:3000/dashboard"
  help_url: "http://localhost:3000/help"

new_feedback:
  business_name: "Test Business"
  rating: "2"
  rating_stars: "⭐⭐"
  customer_name: "Test Customer"
  customer_email: "test@example.com"
  customer_phone: "(555) 123-4567"
  feedback_date: "March 10, 2026 at 2:30 PM"
  comment: "This is a test feedback comment"
  view_feedback_url: "http://localhost:3000/dashboard/feedback/1"
  mark_resolved_url: "http://localhost:3000/dashboard/feedback/1/resolve"
  notification_settings_url: "http://localhost:3000/settings/notifications"
```

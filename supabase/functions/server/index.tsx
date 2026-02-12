import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6b2adf01/health", (c) => {
  return c.json({ status: "ok" });
});

// Business routes
app.get('/make-server-6b2adf01/business/:id', async (c) => {
  try {
    const businessId = c.req.param('id');
    const business = await kv.get(`business:${businessId}`);
    
    if (!business) {
      return c.json({ error: 'Business not found' }, 404);
    }
    
    return c.json(business);
  } catch (error) {
    console.error('Error fetching business:', error);
    return c.json({ error: 'Failed to fetch business' }, 500);
  }
});

app.put('/make-server-6b2adf01/business/:id', async (c) => {
  try {
    const businessId = c.req.param('id');
    const data = await c.req.json();
    
    await kv.set(`business:${businessId}`, data);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating business:', error);
    return c.json({ error: 'Failed to update business' }, 500);
  }
});

// Location routes
app.get('/make-server-6b2adf01/locations', async (c) => {
  try {
    const locations = await kv.getByPrefix('location:');
    return c.json(locations || []);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return c.json({ error: 'Failed to fetch locations' }, 500);
  }
});

app.get('/make-server-6b2adf01/locations/:id', async (c) => {
  try {
    const locationId = c.req.param('id');
    const location = await kv.get(`location:${locationId}`);
    
    if (!location) {
      return c.json({ error: 'Location not found' }, 404);
    }
    
    return c.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    return c.json({ error: 'Failed to fetch location' }, 500);
  }
});

app.post('/make-server-6b2adf01/locations', async (c) => {
  try {
    const data = await c.req.json();
    const locationId = `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const location = {
      id: locationId,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`location:${locationId}`, location);
    
    return c.json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    return c.json({ error: 'Failed to create location' }, 500);
  }
});

app.put('/make-server-6b2adf01/locations/:id', async (c) => {
  try {
    const locationId = c.req.param('id');
    const data = await c.req.json();
    
    const existing = await kv.get(`location:${locationId}`);
    if (!existing) {
      return c.json({ error: 'Location not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...data,
      id: locationId,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`location:${locationId}`, updated);
    
    return c.json(updated);
  } catch (error) {
    console.error('Error updating location:', error);
    return c.json({ error: 'Failed to update location' }, 500);
  }
});

app.delete('/make-server-6b2adf01/locations/:id', async (c) => {
  try {
    const locationId = c.req.param('id');
    await kv.del(`location:${locationId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting location:', error);
    return c.json({ error: 'Failed to delete location' }, 500);
  }
});

// Feedback routes
app.post('/make-server-6b2adf01/feedback', async (c) => {
  try {
    const body = await c.req.json();
    const { businessId, rating, name, email, comment, type } = body;
    
    if (!businessId || !comment || !type) {
      return c.json({ error: "Business ID, comment, and type are required" }, 400);
    }
    
    if (type === 'feedback' && (rating === undefined || rating === null)) {
      return c.json({ error: "Rating is required for feedback" }, 400);
    }
    
    const feedbackId = `${businessId}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const feedback = {
      id: feedbackId,
      businessId,
      rating: type === 'feedback' ? rating : 0,
      name: name || null,
      email: email || null,
      comment,
      type,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`feedback:${feedbackId}`, feedback);
    
    // Also add to business's feedback index
    const businessFeedbackKey = `business:${businessId}:feedback`;
    const existingFeedback = await kv.get(businessFeedbackKey) || [];
    existingFeedback.push(feedbackId);
    await kv.set(businessFeedbackKey, existingFeedback);
    
    return c.json(feedback);
  } catch (error) {
    console.log("Error submitting feedback:", error);
    return c.json({ error: "Failed to submit feedback" }, 500);
  }
});

// Get all feedback for a business
app.get("/make-server-6b2adf01/business/:id/feedback", async (c) => {
  try {
    const businessId = c.req.param("id");
    
    // Get feedback IDs for this business
    const feedbackIds = await kv.get(`business:${businessId}:feedback`) || [];
    
    // Fetch all feedback items
    const feedbackPromises = feedbackIds.map((id: string) => kv.get(`feedback:${id}`));
    const feedbackItems = await Promise.all(feedbackPromises);
    
    // Filter out any null values and sort by date (newest first)
    const validFeedback = feedbackItems
      .filter(item => item !== null)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json(validFeedback);
  } catch (error) {
    console.log("Error fetching feedback:", error);
    return c.json({ error: "Failed to fetch feedback" }, 500);
  }
});

// Submit opt-in for newsletter/rewards
app.post("/make-server-6b2adf01/opt-in", async (c) => {
  try {
    const { businessId, name, email, phone } = await c.req.json();
    
    const optInId = `${businessId}:opt-in:${Date.now()}`;
    const optIn = {
      id: optInId,
      businessId,
      name,
      email,
      phone,
      createdAt: new Date().toISOString()
    };
    
    // Store the opt-in
    await kv.set(`opt-in:${optInId}`, optIn);
    
    // Add to business opt-in list
    const businessOptInsKey = `business:${businessId}:opt-ins`;
    const existingOptIns = await kv.get(businessOptInsKey) || [];
    existingOptIns.push(optInId);
    await kv.set(businessOptInsKey, existingOptIns);
    
    return c.json({ success: true, optIn });
  } catch (error) {
    console.log("Error submitting opt-in:", error);
    return c.json({ error: "Failed to submit opt-in" }, 500);
  }
});

// Get all opt-ins for a business
app.get("/make-server-6b2adf01/business/:id/opt-ins", async (c) => {
  try {
    const businessId = c.req.param("id");
    
    // Get opt-in IDs for this business
    const optInIds = await kv.get(`business:${businessId}:opt-ins`) || [];
    
    // Fetch all opt-in items
    const optInPromises = optInIds.map((id: string) => kv.get(`opt-in:${id}`));
    const optInItems = await Promise.all(optInPromises);
    
    // Filter out any null values and sort by date (newest first)
    const validOptIns = optInItems
      .filter(item => item !== null)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json(validOptIns);
  } catch (error) {
    console.log("Error fetching opt-ins:", error);
    return c.json({ error: "Failed to fetch opt-ins" }, 500);
  }
});

// Initialize demo business (for testing)
app.post("/make-server-6b2adf01/init-demo", async (c) => {
  try {
    const demoBusiness = {
      id: 'demo-business',
      name: 'Sunny Side Cafe',
      logoUrl: null,
      reviewPlatforms: [
        {
          name: 'Google Reviews',
          url: 'https://g.page/r/demo',
          icon: 'google'
        },
        {
          name: 'Yelp',
          url: 'https://www.yelp.com/biz/demo',
          icon: 'yelp'
        },
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/demo',
          icon: 'facebook'
        }
      ],
      createdAt: new Date().toISOString()
    };
    
    await kv.set('business:demo-business', demoBusiness);
    
    // Add some demo feedback
    const demoFeedback = [
      {
        id: 'demo-business:1',
        businessId: 'demo-business',
        rating: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        comment: 'The wait time was way too long - over 45 minutes for a simple breakfast order. The food was good when it finally arrived, but the service needs improvement.',
        type: 'feedback',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-business:2',
        businessId: 'demo-business',
        rating: 1,
        name: null,
        email: null,
        comment: 'Coffee was cold and the table was dirty when we sat down. Very disappointed.',
        type: 'feedback',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-business:3',
        businessId: 'demo-business',
        rating: 0,
        name: 'Alex Rivera',
        email: 'alex@example.com',
        comment: 'Would love to see more vegetarian options on the menu. Maybe add some plant-based protein choices?',
        type: 'suggestion',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    const feedbackIds = [];
    for (const feedback of demoFeedback) {
      await kv.set(`feedback:${feedback.id}`, feedback);
      feedbackIds.push(feedback.id);
    }
    
    await kv.set('business:demo-business:feedback', feedbackIds);
    
    // Add some demo opt-ins
    const demoOptIns = [
      {
        id: 'demo-business:opt-in:1',
        businessId: 'demo-business',
        name: 'Emily Chen',
        email: 'emily.chen@example.com',
        phone: '555-0123',
        rating: 5,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-business:opt-in:2',
        businessId: 'demo-business',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '555-0456',
        rating: 4,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-business:opt-in:3',
        businessId: 'demo-business',
        name: 'Jessica Martinez',
        email: 'jessica.m@example.com',
        phone: '555-0789',
        rating: 5,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    const optInIds = [];
    for (const optIn of demoOptIns) {
      await kv.set(`opt-in:${optIn.id}`, optIn);
      optInIds.push(optIn.id);
    }
    
    await kv.set('business:demo-business:opt-ins', optInIds);
    
    return c.json({ success: true, message: 'Demo data initialized' });
  } catch (error) {
    console.log("Error initializing demo data:", error);
    return c.json({ error: "Failed to initialize demo data" }, 500);
  }
});

// User signup endpoint
app.post("/make-server-6b2adf01/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ user: data.user });
  } catch (error) {
    console.log("Error during signup:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// Create Stripe checkout session
app.post("/make-server-6b2adf01/create-checkout-session", async (c) => {
  try {
    const body = await c.req.json();
    const { planId, billingPeriod } = body;
    
    // Get user from access token
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    // Note: In production, you would integrate with Stripe SDK here
    // For this demo, we'll simulate a session creation
    
    // const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    //   apiVersion: '2023-10-16',
    // });
    
    // const priceIds = {
    //   'pro-monthly': 'price_xxx',
    //   'pro-yearly': 'price_yyy',
    // };
    
    // const session = await stripe.checkout.sessions.create({
    //   customer_email: user.email,
    //   line_items: [
    //     {
    //       price: priceIds[`${planId}-${billingPeriod}`],
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'subscription',
    //   success_url: `${Deno.env.get('APP_URL')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${Deno.env.get('APP_URL')}/pricing`,
    //   metadata: {
    //     userId: user.id,
    //     planId,
    //     billingPeriod,
    //   },
    // });
    
    // For demo purposes, return a mock session
    const mockSessionId = `cs_test_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log("Checkout session requested:", { userId: user.id, planId, billingPeriod });
    
    return c.json({ 
      sessionId: mockSessionId,
      message: "This is a demo. In production, this would create a real Stripe checkout session."
    });
  } catch (error) {
    console.log("Error creating checkout session:", error);
    return c.json({ error: "Failed to create checkout session" }, 500);
  }
});

// Stripe webhook handler
app.post("/make-server-6b2adf01/stripe-webhook", async (c) => {
  try {
    // In production, verify the webhook signature
    // const sig = c.req.header('stripe-signature');
    // const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    
    const body = await c.req.json();
    const event = body;
    
    console.log("Stripe webhook received:", event.type);
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        // Payment successful, activate subscription
        const session = event.data.object;
        console.log("Checkout completed:", session);
        // Update user's subscription status in database
        break;
      
      case 'customer.subscription.updated':
        // Subscription updated
        console.log("Subscription updated:", event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        // Subscription cancelled
        console.log("Subscription cancelled:", event.data.object);
        break;
    }
    
    return c.json({ received: true });
  } catch (error) {
    console.log("Webhook error:", error);
    return c.json({ error: "Webhook processing failed" }, 500);
  }
});

Deno.serve(app.fetch);
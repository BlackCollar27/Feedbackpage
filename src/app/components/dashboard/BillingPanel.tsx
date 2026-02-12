import { useState, useEffect } from 'react';
import { CreditCard, Check, Crown, Zap, Building2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Plan {
  id: string;
  name: string;
  price: number | null;
  billingPeriod: 'monthly' | 'yearly';
  locations: number | null;
  features: string[];
}

export function BillingPanel() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<Plan>({
    id: 'starter',
    name: 'Starter',
    price: 29,
    billingPeriod: 'monthly',
    locations: 1,
    features: [
      '1 location',
      'Unlimited feedback submissions',
      'Advanced analytics',
      'Priority email support',
      'Custom branding',
      'Email notifications',
      'CSV export',
    ]
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Check,
      price: 29,
      locations: 1,
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Zap,
      price: 59,
      locations: 5,
    },
    {
      id: 'business',
      name: 'Business',
      icon: Crown,
      price: 99,
      locations: 15,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Building2,
      price: null,
      locations: null,
    },
  ];

  const currentPlanInfo = plans.find(p => p.id === currentPlan.id);
  const Icon = currentPlanInfo?.icon || Check;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Billing & Plan</h2>
        <button
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span>View All Plans</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-300 mb-1">Current Plan</div>
              <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
            </div>
          </div>
          <div className="text-right">
            {currentPlan.price ? (
              <>
                <div className="text-3xl font-bold">${currentPlan.price}</div>
                <div className="text-sm text-slate-300">per month</div>
              </>
            ) : (
              <div className="text-2xl font-bold">Custom</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm text-slate-300 mb-1">Locations</div>
            <div className="text-2xl font-semibold">
              {currentPlan.locations || 'Unlimited'}
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm text-slate-300 mb-1">Billing Period</div>
            <div className="text-2xl font-semibold capitalize">
              {currentPlan.billingPeriod}
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-sm text-slate-300 mb-1">Status</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">Active</span>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/pricing')}
            className="flex-1 bg-white text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Upgrade Plan
          </button>
          <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors">
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Plan Features */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Plan Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentPlan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-medium text-slate-900">•••• •••• •••• 4242</div>
              <div className="text-sm text-slate-600">Expires 12/2025</div>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'Feb 1, 2026', amount: 29, status: 'Paid' },
            { date: 'Jan 1, 2026', amount: 29, status: 'Paid' },
            { date: 'Dec 1, 2025', amount: 29, status: 'Paid' },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-slate-900 font-medium">{invoice.date}</div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                  {invoice.status}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold text-slate-900">${invoice.amount}.00</div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

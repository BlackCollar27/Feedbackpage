import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, Check } from 'lucide-react';

export function CancelPlanPage() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const reasons = [
    'Too expensive',
    'Not using it enough',
    'Missing features I need',
    'Found a better alternative',
    'Technical issues',
    'Other',
  ];

  const handleCancelPlan = async () => {
    setLoading(true);
    
    try {
      // TODO: Add API call to cancel subscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      alert('Your subscription has been cancelled. You will retain access until the end of your billing period.');
      navigate('/dashboard?tab=billing');
    } catch (error) {
      console.error('Failed to cancel plan:', error);
      alert('Failed to cancel plan. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Warning Header */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Are you absolutely sure?</h2>
              <p className="text-slate-700">
                This action will cancel your subscription. You'll lose access to all premium features at the end of your current billing period.
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Lose */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">What you'll lose:</h3>
          <div className="space-y-3">
            {[
              'Access to all your location feedback pages',
              'Feedback submissions and analytics',
              'Custom branding and settings',
              'Email notifications',
              'CSV export functionality',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs">✕</span>
                </div>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Keep My Plan
            </button>
            <button
              onClick={handleCancelPlan}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Cancelling...' : 'Yes, Cancel Plan'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Cancel Your Plan</h2>
        <p className="text-slate-600">We're sorry to see you go. Please help us understand why you're cancelling.</p>
      </div>

      {/* Cancellation Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Why are you cancelling? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {reasons.map((reasonOption) => (
              <label
                key={reasonOption}
                className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 transition-colors"
              >
                <input
                  type="radio"
                  name="reason"
                  value={reasonOption}
                  checked={reason === reasonOption}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-4 h-4 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-slate-700 font-medium">{reasonOption}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Additional feedback (optional)
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us more about your experience or what we could improve..."
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-slate-900 focus:ring-0 resize-none"
            rows={4}
          />
        </div>
      </div>

      {/* Alternative Options */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Before you go...</h3>
        <p className="text-slate-700 mb-4">Have you considered these alternatives?</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white rounded-lg p-4">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">Downgrade to a lower plan</div>
              <div className="text-sm text-slate-600">Save money while keeping essential features</div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-4">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">Contact support</div>
              <div className="text-sm text-slate-600">We're here to help resolve any issues you're facing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/dashboard?tab=billing')}
            className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => setShowConfirmation(true)}
            disabled={!reason}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

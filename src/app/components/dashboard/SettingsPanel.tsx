import { useState, useEffect } from 'react';
import { Save, Link as LinkIcon } from 'lucide-react';
import { api } from '../../api/client';

interface BusinessSettings {
  businessName: string;
  logoUrl: string;
  reviewPlatforms: {
    google?: string;
    yelp?: string;
    facebook?: string;
    tripadvisor?: string;
    trustpilot?: string;
  };
  emailNotifications: boolean;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
}

export function SettingsPanel() {
  const [settings, setSettings] = useState<BusinessSettings>({
    businessName: '',
    logoUrl: '',
    reviewPlatforms: {},
    emailNotifications: true,
    autoReplyEnabled: false,
    autoReplyMessage: ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const business = await api.getBusiness('demo-business');
      setSettings({
        businessName: business.name || '',
        logoUrl: business.logoUrl || '',
        reviewPlatforms: business.reviewPlatforms || {},
        emailNotifications: business.emailNotifications ?? true,
        autoReplyEnabled: business.autoReplyEnabled ?? false,
        autoReplyMessage: business.autoReplyMessage || ''
      });
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      await api.updateBusiness('demo-business', {
        name: settings.businessName,
        logoUrl: settings.logoUrl,
        reviewPlatforms: settings.reviewPlatforms,
        emailNotifications: settings.emailNotifications,
        autoReplyEnabled: settings.autoReplyEnabled,
        autoReplyMessage: settings.autoReplyMessage
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Business Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Logo URL (Optional)
            </label>
            <input
              type="url"
              value={settings.logoUrl}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Review Platforms */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Review Platform Links</h3>
        <p className="text-sm text-slate-600 mb-4">
          Add links to your review profiles. Customers with 4-5 star ratings will be directed here.
        </p>
        
        <div className="space-y-4">
          {[
            { key: 'google', label: 'Google Reviews' },
            { key: 'yelp', label: 'Yelp' },
            { key: 'facebook', label: 'Facebook' },
            { key: 'tripadvisor', label: 'TripAdvisor' },
            { key: 'trustpilot', label: 'Trustpilot' }
          ].map((platform) => (
            <div key={platform.key}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {platform.label}
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="url"
                  value={settings.reviewPlatforms[platform.key as keyof typeof settings.reviewPlatforms] || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    reviewPlatforms: {
                      ...settings.reviewPlatforms,
                      [platform.key]: e.target.value
                    }
                  })}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h3>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-slate-900">Email Notifications</div>
              <div className="text-sm text-slate-600">Receive an email when new feedback is submitted</div>
            </div>
          </label>
        </div>
      </div>

      {/* Auto Reply */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Auto Reply</h3>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoReplyEnabled}
              onChange={(e) => setSettings({ ...settings, autoReplyEnabled: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-slate-900">Enable Auto Reply</div>
              <div className="text-sm text-slate-600">Automatically send a thank you message to customers who leave feedback</div>
            </div>
          </label>

          {settings.autoReplyEnabled && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Auto Reply Message
              </label>
              <textarea
                value={settings.autoReplyMessage}
                onChange={(e) => setSettings({ ...settings, autoReplyMessage: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Thank you for your feedback! We really appreciate you taking the time to share your experience with us."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

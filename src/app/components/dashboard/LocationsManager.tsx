import { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2, ExternalLink, Copy, Check } from 'lucide-react';
import { api } from '../../api/client';

interface Location {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  reviewPlatforms: Array<{ name: string; url: string }>;
  createdAt: string;
}

export function LocationsManager() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await api.getLocations();
      setLocations(data);
    } catch (error) {
      console.error('Failed to load locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteLocation(id);
      setLocations(locations.filter(loc => loc.id !== id));
    } catch (error) {
      console.error('Failed to delete location:', error);
      alert('Failed to delete location. Please try again.');
    }
  };

  const copyFeedbackUrl = (locationId: string) => {
    const url = `${window.location.origin}/l/${locationId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(locationId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Locations</h2>
          <p className="text-slate-600 mt-1">Manage your business locations and feedback pages</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Location
        </button>
      </div>

      {/* Locations Grid */}
      {locations.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
          <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No locations yet</h3>
          <p className="text-slate-600 mb-6">Create your first location to start collecting feedback</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Your First Location
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              {/* Location Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{location.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingLocation(location)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              {(location.phone || location.email) && (
                <div className="mb-4 space-y-1">
                  {location.phone && (
                    <p className="text-sm text-slate-600">📞 {location.phone}</p>
                  )}
                  {location.email && (
                    <p className="text-sm text-slate-600">✉️ {location.email}</p>
                  )}
                </div>
              )}

              {/* Review Platforms */}
              <div className="mb-4">
                <p className="text-xs font-medium text-slate-700 mb-2">Review Platforms:</p>
                <div className="flex flex-wrap gap-2">
                  {location.reviewPlatforms.map((platform, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {platform.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feedback URL */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-700 mb-2">Feedback Page URL:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-slate-50 px-3 py-2 rounded-lg text-slate-700 overflow-x-auto">
                    {window.location.origin}/l/{location.id}
                  </code>
                  <button
                    onClick={() => copyFeedbackUrl(location.id)}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                    title="Copy URL"
                  >
                    {copiedId === location.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`/l/${location.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingLocation) && (
        <LocationModal
          location={editingLocation}
          onClose={() => {
            setShowAddModal(false);
            setEditingLocation(null);
          }}
          onSave={async (location) => {
            await loadLocations();
            setShowAddModal(false);
            setEditingLocation(null);
          }}
        />
      )}
    </div>
  );
}

interface LocationModalProps {
  location: Location | null;
  onClose: () => void;
  onSave: (location: Location) => void;
}

function LocationModal({ location, onClose, onSave }: LocationModalProps) {
  const [name, setName] = useState(location?.name || '');
  const [address, setAddress] = useState(location?.address || '');
  const [phone, setPhone] = useState(location?.phone || '');
  const [email, setEmail] = useState(location?.email || '');
  const [reviewPlatforms, setReviewPlatforms] = useState<Array<{ name: string; url: string }>>(
    location?.reviewPlatforms || [{ name: 'Google', url: '' }]
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const locationData = {
        name,
        address,
        phone: phone || undefined,
        email: email || undefined,
        reviewPlatforms: reviewPlatforms.filter(p => p.name && p.url)
      };

      if (location) {
        await api.updateLocation(location.id, locationData);
      } else {
        await api.createLocation(locationData);
      }

      onSave(locationData as Location);
    } catch (error) {
      console.error('Failed to save location:', error);
      alert('Failed to save location. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addPlatform = () => {
    setReviewPlatforms([...reviewPlatforms, { name: '', url: '' }]);
  };

  const removePlatform = (index: number) => {
    setReviewPlatforms(reviewPlatforms.filter((_, i) => i !== index));
  };

  const updatePlatform = (index: number, field: 'name' | 'url', value: string) => {
    const updated = [...reviewPlatforms];
    updated[index][field] = value;
    setReviewPlatforms(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-slate-900">
            {location ? 'Edit Location' : 'Add New Location'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Downtown Store"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main St, City, State 12345"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="location@business.com"
                />
              </div>
            </div>
          </div>

          {/* Review Platforms */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-slate-700">
                Review Platforms
              </label>
              <button
                type="button"
                onClick={addPlatform}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Platform
              </button>
            </div>

            <div className="space-y-3">
              {reviewPlatforms.map((platform, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={platform.name}
                    onChange={(e) => updatePlatform(index, 'name', e.target.value)}
                    className="w-1/3 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="Google">Google</option>
                    <option value="Yelp">Yelp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TripAdvisor">TripAdvisor</option>
                    <option value="Trustpilot">Trustpilot</option>
                  </select>
                  <input
                    type="url"
                    value={platform.url}
                    onChange={(e) => updatePlatform(index, 'url', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => removePlatform(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : location ? 'Save Changes' : 'Create Location'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

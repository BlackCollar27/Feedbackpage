import { useState, useEffect } from 'react';
import { Star, Download, Search, Filter, X } from 'lucide-react';
import { api } from '../../api/client';

interface Feedback {
  id: string;
  businessId: string;
  locationId?: string;
  rating: number;
  name?: string;
  email?: string;
  comment: string;
  type: 'feedback' | 'suggestion';
  createdAt: string;
}

export function FeedbackList() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'feedback' | 'suggestion'>('all');

  useEffect(() => {
    loadFeedback();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterRating, filterType, feedback]);

  const loadFeedback = async () => {
    try {
      const data = await api.getFeedback();
      setFeedback(data);
      setFilteredFeedback(data);
    } catch (error) {
      console.error('Failed to load feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...feedback];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rating filter
    if (filterRating !== null) {
      filtered = filtered.filter(f => f.rating === filterRating);
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(f => f.type === filterType);
    }

    setFilteredFeedback(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Rating', 'Name', 'Email', 'Comment', 'Type'];
    const rows = filteredFeedback.map(f => [
      new Date(f.createdAt).toLocaleDateString(),
      f.rating,
      f.name || '',
      f.email || '',
      f.comment || '',
      f.type
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
          <h2 className="text-2xl font-bold text-slate-900">All Feedback</h2>
          <p className="text-slate-600 mt-1">{filteredFeedback.length} items</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search feedback..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Rating Filter */}
          <select
            value={filterRating ?? ''}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="feedback">Feedback</option>
            <option value="suggestion">Suggestions</option>
          </select>
        </div>

        {/* Active Filters */}
        {(searchTerm || filterRating !== null || filterType !== 'all') && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
            <span className="text-sm text-slate-600">Active filters:</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200"
              >
                Search: {searchTerm}
                <X className="w-3 h-3" />
              </button>
            )}
            {filterRating !== null && (
              <button
                onClick={() => setFilterRating(null)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200"
              >
                {filterRating} Stars
                <X className="w-3 h-3" />
              </button>
            )}
            {filterType !== 'all' && (
              <button
                onClick={() => setFilterType('all')}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200"
              >
                {filterType}
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-600">No feedback found</p>
          </div>
        ) : (
          filteredFeedback.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= item.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.type === 'suggestion'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <span className="text-sm text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>

              {item.comment && (
                <p className="text-slate-700 mb-3">{item.comment}</p>
              )}

              {(item.name || item.email) && (
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  {item.name && <span>👤 {item.name}</span>}
                  {item.email && <span>✉️ {item.email}</span>}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

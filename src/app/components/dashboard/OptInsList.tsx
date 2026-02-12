import { useState, useEffect } from 'react';
import { Gift, Mail, Calendar, User } from 'lucide-react';
import { api } from '../../api/client';

interface OptIn {
  id: string;
  name?: string;
  email: string;
  createdAt: string;
  rating?: number;
}

export function OptInsList() {
  const [optIns, setOptIns] = useState<OptIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOptIns();
  }, []);

  const loadOptIns = async () => {
    try {
      setLoading(true);
      const data = await api.getOptIns('demo-business');
      setOptIns(data);
    } catch (error) {
      console.error('Failed to load opt-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600">Loading opt-ins...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Rewards Opt-Ins</h2>
          <p className="text-sm text-slate-600 mt-1">
            Customers who opted in to receive rewards and promotional offers
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">{optIns.length} Total</span>
        </div>
      </div>

      {optIns.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Gift className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No opt-ins yet</h3>
          <p className="text-slate-600">
            When customers opt in to receive rewards, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {optIns.map((optIn) => (
                  <tr key={optIn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {optIn.name || 'Anonymous'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span>{optIn.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(optIn.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {optIn.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < optIn.rating!
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

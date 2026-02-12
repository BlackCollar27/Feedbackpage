import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LayoutDashboard, MessageSquare, Settings, LogOut, Menu, X, MapPin, CreditCard, Gift, HelpCircle } from 'lucide-react';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { FeedbackList } from './dashboard/FeedbackList';
import { SettingsPanel } from './dashboard/SettingsPanel';
import { LocationsManager } from './dashboard/LocationsManager';
import { BillingPanel } from './dashboard/BillingPanel';
import { OptInsList } from './dashboard/OptInsList';
import { HelpPanel } from './dashboard/HelpPanel';
import { useAuth, supabase } from '../contexts/AuthContext';
import logo from "figma:asset/522972406135c9ad603cf025748077edfe6ccf73.png";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'feedback' | 'locations' | 'opt-ins' | 'billing' | 'help' | 'settings'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Temporarily disabled auth check - allow access without login
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/home');
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'feedback' as const, label: 'Feedback', icon: MessageSquare },
    { id: 'locations' as const, label: 'Locations', icon: MapPin },
    { id: 'opt-ins' as const, label: 'Opt-Ins', icon: Gift },
    { id: 'billing' as const, label: 'Billing', icon: CreditCard },
    { id: 'help' as const, label: 'Help', icon: HelpCircle },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Feedback Page" className="h-12" />
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg absolute right-4"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-20
          w-64 bg-white border-r border-slate-200
          transform transition-transform duration-200 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="hidden lg:block p-6 border-b border-slate-200">
              <img src={logo} alt="Feedback Page" className="h-14" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* User & Logout */}
            <div className="p-4 border-t border-slate-200">
              {user && (
                <div className="mb-3 px-4 py-2 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 truncate">{user.email}</p>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'feedback' && <FeedbackList />}
          {activeTab === 'locations' && <LocationsManager />}
          {activeTab === 'opt-ins' && <OptInsList />}
          {activeTab === 'billing' && <BillingPanel />}
          {activeTab === 'help' && <HelpPanel />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
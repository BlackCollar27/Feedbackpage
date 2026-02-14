import { useNavigate, Link } from 'react-router';
import { Star, MessageSquare, ExternalLink, Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Footer } from './Footer';
import { SEO } from './SEO';
import logo from "figma:asset/522972406135c9ad603cf025748077edfe6ccf73.png";

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SEO
        title="Turn Negative Feedback into Growth Opportunities"
        description="Capture negative customer experiences privately while directing happy customers to leave public reviews. Build your reputation intelligently with Feedback Page."
        keywords="customer feedback, online reviews, reputation management, feedback collection, review management, customer satisfaction"
        canonical="https://feedbackpage.com"
      />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center md:justify-start">
              <Link to="/home">
                <img 
                  src={logo} 
                  alt="Feedback Page" 
                  className="h-16 md:h-20 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 md:gap-3">
              <Link
                to="/home"
                className="text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-2 md:px-3 py-1.5 md:py-2"
              >
                Home
              </Link>
              <Link
                to="/features"
                className="text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-2 md:px-3 py-1.5 md:py-2"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-2 md:px-3 py-1.5 md:py-2"
              >
                Pricing
              </Link>
              <Link
                to="/login"
                className="text-xs md:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors px-3 md:px-4 py-1.5 md:py-2 rounded-lg"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg absolute right-4"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors text-center"
                >
                  Sign In
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4 md:mb-6 leading-tight px-4">Turn Negative Feedback into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Positive Relationships</span></h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-6 md:mb-8 px-4">
            Capture unhappy customer experiences privately while directing satisfied customers to leave public reviews. 
            Protect your reputation and improve your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button
              onClick={() => navigate(user ? '/dashboard' : '/onboarding')}
              className="px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-xl font-semibold text-base md:text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
            >
              {user ? 'Go to Dashboard' : 'Get Started Free'}
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 border-2 border-slate-300 rounded-xl font-semibold text-base md:text-lg hover:border-slate-400 transition-all"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-slate-600">
              A complete reputation management solution in one simple tool
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Mobile-First Design',
                description: 'Beautiful, responsive pages that work perfectly on any device'
              },
              {
                title: 'Custom Branding',
                description: 'Add your logo and business name to build trust'
              },
              {
                title: 'Multiple Platforms',
                description: 'Link to Google, Yelp, Facebook, and more'
              },
              {
                title: 'Dashboard Analytics',
                description: 'View all feedback and track your average rating'
              },
              {
                title: 'Export Data',
                description: 'Download all feedback as CSV for further analysis'
              },
              {
                title: 'Suggestion Box',
                description: 'Let happy customers share ideas for improvement too'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Ready to improve your reputation?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Set up your Feedback Page in under 2 minutes. No credit card required.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 text-lg font-medium text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, AlertCircle, Menu, X } from 'lucide-react';
import logo from "figma:asset/522972406135c9ad603cf025748077edfe6ccf73.png";
import { Footer } from './Footer';

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, name);
        navigate('/onboarding');
      } else {
        await signIn(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/home" className="inline-block">
              
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-slate-600">
              {isSignUp 
                ? 'Start capturing valuable customer feedback' 
                : 'Sign in to your Feedback Page account'
              }
            </p>
          </div>

          {/* Login/Signup Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                {isSignUp && (
                  <p className="mt-1 text-xs text-slate-500">Must be at least 6 characters</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isSignUp ? 'Create account' : 'Sign in')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-center text-sm text-slate-500 mt-6">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Footer } from './Footer';
import logo from "figma:asset/522972406135c9ad603cf025748077edfe6ccf73.png";

export function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setError('Invalid or missing verification token');
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to verify email');
      }

      setSuccess(true);
      
      // Redirect to dashboard or login after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <Link to="/">
            <img 
              src={logo} 
              alt="Feedback Page" 
              className="h-16 md:h-20 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            {verifying ? (
              // Verifying State
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h1 className="text-2xl md:text-3xl text-slate-900 mb-2">
                  Verifying Your Email
                </h1>
                <p className="text-slate-600">
                  Please wait while we verify your email address...
                </p>
              </div>
            ) : success ? (
              // Success State
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl md:text-3xl text-slate-900 mb-2">
                  Email Verified!
                </h1>
                <p className="text-slate-600 mb-6">
                  Your email address has been successfully verified. You can now access all features of Feedback Page.
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Redirecting to dashboard in 3 seconds...
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              // Error State
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl md:text-3xl text-slate-900 mb-2">
                  Verification Failed
                </h1>
                <p className="text-slate-600 mb-2">
                  {error}
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  The verification link may be invalid or expired. Please try signing up again or contact support.
                </p>
                
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Go to Login
                  </Link>
                  <Link
                    to="/contact-us"
                    className="block w-full border-2 border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Additional Help */}
          {!verifying && !success && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 mb-2">
                <strong>Need help?</strong>
              </p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Check if the link in your email is complete</li>
                <li>Try copying and pasting the entire URL</li>
                <li>Request a new verification email from your account</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

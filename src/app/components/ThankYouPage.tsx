import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { Star, ExternalLink, CheckCircle2, ArrowLeft, Gift } from 'lucide-react';
import logo from "figma:asset/522972406135c9ad603cf025748077edfe6ccf73.png";
import { api } from '../api/client';

export function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const rating = location.state?.rating || 0;
  const comment = location.state?.comment || '';
  const images = location.state?.images || [];
  const [business, setBusiness] = useState<any>(null);
  const [additionalComment, setAdditionalComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const loadBusiness = async () => {
      try {
        // Initialize demo data first
        await api.initDemo();
        
        const data = await api.getBusiness('demo-business');
        setBusiness(data);
      } catch (error) {
        console.error('Failed to load business:', error);
      }
    };

    loadBusiness();
  }, []);

  const handleSubmitComment = async () => {
    if (!additionalComment.trim() || submitting) return;
    
    setSubmitting(true);
    try {
      await api.submitFeedback({
        businessId: 'demo-business',
        rating: rating,
        comment: additionalComment,
        name: '',
        email: '',
      });
      setAdditionalComment('');
      alert('Thank you for your additional feedback!');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Back to Home Button - Fixed to top-left */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Back to Home</span>
        </button>
      </div>

      {/* Centered Content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6 mt-4">
            <img src={logo} alt="Logo" className="h-24" />
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-black flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-black mb-2 text-center tracking-tight">
            Thank you for your feedback!
          </h1>

          {/* Show comment and images if provided */}
          {(comment || images.length > 0) && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">Your feedback:</p>
              {comment && (
                <p className="text-sm text-gray-600 mb-3">{comment}</p>
              )}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img: string, index: number) => (
                    <img 
                      key={index} 
                      src={img} 
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6 text-center px-2">
            We're thrilled you had a great experience! Would you mind sharing your review on one of these platforms?
          </p>

          {/* Review Platform Links */}
          <div className="space-y-3 mb-6">
            {business?.reviewPlatforms?.map((platform: any, index: number) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3.5 border border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
              >
                <span className="text-sm font-medium text-black">
                  Leave a review on {platform.name}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Opt-In Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/opt-in')}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 border-2 border-black bg-white rounded-lg hover:bg-black hover:text-white transition-all group"
            >
              <Gift className="w-4 h-4" strokeWidth={2} />
              <span className="text-sm font-semibold">
                Join Our Newsletter & Rewards Program
              </span>
            </button>
          </div>

          {/* Additional Comment Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-base font-semibold text-black mb-4 text-center">
              Share Additional Comments (Optional)
            </h2>
            
            <textarea
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              placeholder="What did you enjoy most? Any suggestions?"
              rows={4}
              className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 resize-none placeholder:text-gray-400 transition-all"
            />
            <button
              onClick={handleSubmitComment}
              disabled={submitting || !additionalComment.trim()}
              className="w-full mt-3 bg-black text-white py-3.5 rounded-xl font-medium text-sm hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black shadow-sm"
            >
              {submitting ? 'Submitting...' : 'Submit Additional Feedback'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
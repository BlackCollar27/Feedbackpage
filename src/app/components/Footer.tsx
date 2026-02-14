import { Link } from 'react-router';
import { Mail, Twitter, Linkedin, Facebook, ChevronDown } from 'lucide-react';
import logo from "figma:asset/522972406135c9ad603cf025748077edfe6ccf73.png";
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isSectionOpen = (section: string) => openSections.includes(section);

  return (
    <footer className="text-slate-600 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Logo Section */}
        <div className="mb-8 md:mb-12 flex justify-center md:justify-start">
          <Link to="/home">
            <img 
              src={logo} 
              alt="Feedback Page" 
              className="h-12 md:h-14 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Product */}
          <div>
            <button
              onClick={() => toggleSection('product')}
              className="w-full flex items-center justify-between sm:cursor-default text-center sm:text-left mb-4"
            >
              <h3 className="text-slate-900 font-semibold text-base md:text-lg flex-1 sm:flex-none">Product</h3>
              <ChevronDown 
                className={`w-5 h-5 text-slate-900 transition-transform sm:hidden ${
                  isSectionOpen('product') ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ul className={`space-y-3 overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
              isSectionOpen('product') ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <li className="text-center sm:text-left">
                <Link to="/pricing" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  Pricing
                </Link>
              </li>
              <li className="text-center sm:text-left">
                <Link to="/" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <button
              onClick={() => toggleSection('company')}
              className="w-full flex items-center justify-between sm:cursor-default text-center sm:text-left mb-4"
            >
              <h3 className="text-slate-900 font-semibold text-base md:text-lg flex-1 sm:flex-none">Company</h3>
              <ChevronDown 
                className={`w-5 h-5 text-slate-900 transition-transform sm:hidden ${
                  isSectionOpen('company') ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ul className={`space-y-3 overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
              isSectionOpen('company') ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <li className="text-center sm:text-left">
                <Link to="/home" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  About
                </Link>
              </li>
              <li className="text-center sm:text-left">
                <Link to="/contact-us" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  Contact
                </Link>
              </li>
              <li className="text-center sm:text-left">
                <Link to="/contact-us" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <button
              onClick={() => toggleSection('legal')}
              className="w-full flex items-center justify-between sm:cursor-default text-center sm:text-left mb-4"
            >
              <h3 className="text-slate-900 font-semibold text-base md:text-lg flex-1 sm:flex-none">Legal</h3>
              <ChevronDown 
                className={`w-5 h-5 text-slate-900 transition-transform sm:hidden ${
                  isSectionOpen('legal') ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ul className={`space-y-3 overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
              isSectionOpen('legal') ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <li className="text-center sm:text-left">
                <Link to="/privacy" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li className="text-center sm:text-left">
                <Link to="/terms" className="hover:text-slate-900 transition-colors text-sm md:text-base">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <button
              onClick={() => toggleSection('connect')}
              className="w-full flex items-center justify-between sm:cursor-default text-center sm:text-left mb-4"
            >
              <h3 className="text-slate-900 font-semibold text-base md:text-lg flex-1 sm:flex-none">Connect</h3>
              <ChevronDown 
                className={`w-5 h-5 text-slate-900 transition-transform sm:hidden ${
                  isSectionOpen('connect') ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 sm:!max-h-none sm:!opacity-100 ${
              isSectionOpen('connect') ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="flex gap-3 justify-center sm:justify-start mb-4">
                <a 
                  href="https://twitter.com/feedbackpage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://linkedin.com/company/feedbackpage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://facebook.com/feedbackpage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              </div>
              <div className="flex justify-center sm:justify-start">
                <a 
                  href="mailto:support@feedbackpage.com" 
                  className="flex items-center gap-2 text-sm md:text-base hover:text-slate-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="break-all sm:break-normal">support@feedbackpage.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-600">
            © {currentYear} Feedback Page. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Made with ❤️ for businesses that care about customer feedback
          </p>
        </div>
      </div>
    </footer>
  );
}
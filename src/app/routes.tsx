import { createBrowserRouter } from 'react-router';
import { HomePage } from './components/HomePage';
import { RatingPage } from './components/RatingPage';
import { LocationRatingPage } from './components/LocationRatingPage';
import { FeedbackForm } from './components/FeedbackForm';
import { ThankYouPage } from './components/ThankYouPage';
import { OptInPage } from './components/OptInPage';
import { SubmittedPage } from './components/SubmittedPage';
import { SuggestionForm } from './components/SuggestionForm';
import { LoginPage } from './components/LoginPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { HelpCenter } from './components/HelpCenter';
import { PricingPage } from './components/PricingPage';
import { FeaturesPage } from './components/FeaturesPage';
import { ContactUsPage } from './components/ContactUsPage';

export const router = createBrowserRouter([
  {
    path: '/home',
    Component: HomePage,
  },
  {
    path: '/',
    Component: RatingPage,
  },
  {
    path: '/l/:locationId',
    Component: LocationRatingPage,
  },
  {
    path: '/feedback',
    Component: FeedbackForm,
  },
  {
    path: '/thank-you',
    Component: ThankYouPage,
  },
  {
    path: '/opt-in',
    Component: OptInPage,
  },
  {
    path: '/feedback-submitted',
    Component: SubmittedPage,
  },
  {
    path: '/suggestion',
    Component: SuggestionForm,
  },
  {
    path: '/suggestion-submitted',
    Component: SubmittedPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/onboarding',
    Component: OnboardingFlow,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/help',
    Component: HelpCenter,
  },
  {
    path: '/pricing',
    Component: PricingPage,
  },
  {
    path: '/features',
    Component: FeaturesPage,
  },
  {
    path: '/contact-us',
    Component: ContactUsPage,
  },
]);

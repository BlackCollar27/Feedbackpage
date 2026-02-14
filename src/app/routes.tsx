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
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { PricingPage } from './components/PricingPage';
import { FeaturesPage } from './components/FeaturesPage';
import { ContactUsPage } from './components/ContactUsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { NotFoundPage } from './components/NotFoundPage';
import { AddLocationPage } from './components/dashboard/AddLocationPage';
import { EditLocationPage } from './components/dashboard/EditLocationPage';
import { LocationStatsPage } from './components/dashboard/LocationStatsPage';
import { CancelPlanPage } from './components/dashboard/CancelPlanPage';
import { PlansPage } from './components/dashboard/PlansPage';
import { ContactSupportPage } from './components/dashboard/ContactSupportPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/home',
    Component: HomePage,
  },
  {
    path: '/demo',
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
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'locations/new',
        Component: AddLocationPage,
      },
      {
        path: 'locations/edit/:locationId',
        Component: EditLocationPage,
      },
      {
        path: 'locations/:locationId',
        Component: LocationStatsPage,
      },
      {
        path: 'plans',
        Component: PlansPage,
      },
      {
        path: 'cancel-plan',
        Component: CancelPlanPage,
      },
      {
        path: 'contact-support',
        Component: ContactSupportPage,
      },
    ],
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
  {
    path: '/privacy',
    Component: PrivacyPage,
  },
  {
    path: '/terms',
    Component: TermsOfServicePage,
  },
  {
    path: '/terms-of-service',
    Component: TermsOfServicePage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
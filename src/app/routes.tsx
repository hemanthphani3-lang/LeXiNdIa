import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import EducatorDashboard from "./pages/dashboards/EducatorDashboard";
import LegalExpertDashboard from "./pages/dashboards/LegalExpertDashboard";
import CitizenDashboard from "./pages/dashboards/CitizenDashboard";
import ArticleView from "./pages/ArticleView";
import ArticleDetail from "./pages/ArticleDetail";
import DiscussionForum from "./pages/DiscussionForum";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import AmendmentHistory from "./pages/AmendmentHistory";

// Auth pages
import AdminLogin from "./pages/auth/AdminLogin";
import EducatorLogin from "./pages/auth/EducatorLogin";
import EducatorSignup from "./pages/auth/EducatorSignup";
import LegalExpertLogin from "./pages/auth/LegalExpertLogin";
import LegalExpertSignup from "./pages/auth/LegalExpertSignup";
import CitizenLogin from "./pages/auth/CitizenLogin";
import CitizenSignup from "./pages/auth/CitizenSignup";

// Admin pages
import ManageUsers from "./pages/dashboards/admin/ManageUsers";
import ManageRoles from "./pages/dashboards/admin/ManageRoles";
import ContentApproval from "./pages/dashboards/admin/ContentApproval";
import Analytics from "./pages/dashboards/admin/Analytics";
import ActiveArticles from "./pages/dashboards/admin/ActiveArticles";
import CreateArticle from "./pages/dashboards/admin/CreateArticle";
import SystemLogs from "./pages/dashboards/admin/SystemLogs";
import AdminSettings from "./pages/dashboards/admin/AdminSettings";
import AdminProfile from "./pages/dashboards/admin/AdminProfile";

// Educator pages
import CreateContent from "./pages/dashboards/educator/CreateContent";
import ScheduleSessions from "./pages/dashboards/educator/ScheduleSessions";
import Articles from "./pages/dashboards/educator/Articles";
import QuizCreator from "./pages/dashboards/educator/QuizCreator";
import StudentInteraction from "./pages/dashboards/educator/StudentInteraction";
import EducatorNotifications from "./pages/dashboards/educator/Notifications";
import EducatorSettings from "./pages/dashboards/educator/EducatorSettings";
import EducatorProfile from "./pages/dashboards/educator/EducatorProfile";

// Legal Expert pages
import LegalArticles from "./pages/dashboards/legal-expert/LegalArticles";
import LegalInsights from "./pages/dashboards/legal-expert/LegalInsights";
import PublishInsight from "./pages/dashboards/legal-expert/PublishInsight";
import CaseReferences from "./pages/dashboards/legal-expert/CaseReferences";
import AddCaseReference from "./pages/dashboards/legal-expert/AddCaseReference";
import Amendments from "./pages/dashboards/legal-expert/Amendments";
import Advisory from "./pages/dashboards/legal-expert/Advisory";
import LegalNotifications from "./pages/dashboards/legal-expert/LegalNotifications";
import LegalSettings from "./pages/dashboards/legal-expert/LegalSettings";
import LegalProfile from "./pages/dashboards/legal-expert/LegalProfile";

// Citizen pages
import ExploreConstitution from "./pages/dashboards/citizen/ExploreConstitution";
import FundamentalRights from "./pages/dashboards/citizen/FundamentalRights";
import FundamentalDuties from "./pages/dashboards/citizen/FundamentalDuties";
import Bookmarks from "./pages/dashboards/citizen/Bookmarks";
import CitizenNotifications from "./pages/dashboards/citizen/Notifications";
import CitizenSettings from "./pages/dashboards/citizen/CitizenSettings";
import AllArticles from "./pages/dashboards/citizen/AllArticles";
import DirectivePrinciples from "./pages/dashboards/citizen/DirectivePrinciples";
import UnionGovernment from "./pages/dashboards/citizen/UnionGovernment";
import CitizenProfile from "./pages/dashboards/citizen/CitizenProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/verify",
    Component: Verification,
  },
  // Admin Auth (Login only - no signup for security)
  {
    path: "/auth/admin/login",
    Component: AdminLogin,
  },
  // Educator Auth
  {
    path: "/auth/educator/login",
    Component: EducatorLogin,
  },
  {
    path: "/auth/educator/signup",
    Component: EducatorSignup,
  },
  // Legal Expert Auth
  {
    path: "/auth/legal-expert/login",
    Component: LegalExpertLogin,
  },
  {
    path: "/auth/legal-expert/signup",
    Component: LegalExpertSignup,
  },
  // Citizen Auth
  {
    path: "/auth/citizen/login",
    Component: CitizenLogin,
  },
  {
    path: "/auth/citizen/signup",
    Component: CitizenSignup,
  },
  // Dashboards
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator",
    element: (
      <ProtectedRoute requiredRole="educator">
        <EducatorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <LegalExpertDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <CitizenDashboard />
      </ProtectedRoute>
    ),
  },
  // Citizen pages
  {
    path: "/citizen/explore",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <ExploreConstitution />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/rights",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <FundamentalRights />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/rights/:category",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <ArticleView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/duties",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <FundamentalDuties />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/bookmarks",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <Bookmarks />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/notifications",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <CitizenNotifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/settings",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <CitizenSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/quiz/:id",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <Quiz />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/article/:id",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <ArticleDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/articles",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <AllArticles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/directive-principles",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <DirectivePrinciples />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/union-government",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <UnionGovernment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/citizen/profile",
    element: (
      <ProtectedRoute requiredRole="citizen">
        <CitizenProfile />
      </ProtectedRoute>
    ),
  },
  // Other pages
  {
    path: "/article/:id",
    Component: ArticleView,
  },
  {
    path: "/article-detail/:id",
    Component: ArticleDetail,
  },
  {
    path: "/forum",
    Component: DiscussionForum,
  },
  {
    path: "/quiz/:id",
    Component: Quiz,
  },
  {
    path: "*",
    Component: NotFound,
  },
  // Info pages
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/amendment-history",
    Component: AmendmentHistory,
  },
  // Admin pages
  {
    path: "/admin/manage-users",
    element: (
      <ProtectedRoute requiredRole="admin">
        <ManageUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/manage-roles",
    element: (
      <ProtectedRoute requiredRole="admin">
        <ManageRoles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/content-approval",
    element: (
      <ProtectedRoute requiredRole="admin">
        <ContentApproval />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/analytics",
    element: (
      <ProtectedRoute requiredRole="admin">
        <Analytics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/active-articles",
    element: (
      <ProtectedRoute requiredRole="admin">
        <ActiveArticles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/create-article",
    element: (
      <ProtectedRoute requiredRole="admin">
        <CreateArticle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/system-logs",
    element: (
      <ProtectedRoute requiredRole="admin">
        <SystemLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminProfile />
      </ProtectedRoute>
    ),
  },
  // Educator pages
  {
    path: "/educator/create",
    element: (
      <ProtectedRoute requiredRole="educator">
        <CreateContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/sessions",
    element: (
      <ProtectedRoute requiredRole="educator">
        <ScheduleSessions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/articles",
    element: (
      <ProtectedRoute requiredRole="educator">
        <Articles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/quiz",
    element: (
      <ProtectedRoute requiredRole="educator">
        <QuizCreator />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/students",
    element: (
      <ProtectedRoute requiredRole="educator">
        <StudentInteraction />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/notifications",
    element: (
      <ProtectedRoute requiredRole="educator">
        <EducatorNotifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/settings",
    element: (
      <ProtectedRoute requiredRole="educator">
        <EducatorSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/educator/profile",
    element: (
      <ProtectedRoute requiredRole="educator">
        <EducatorProfile />
      </ProtectedRoute>
    ),
  },
  // Legal Expert pages
  {
    path: "/legal-expert/articles",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <LegalArticles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/insights",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <LegalInsights />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/insights/publish",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <PublishInsight />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/cases",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <CaseReferences />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/cases/add",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <AddCaseReference />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/amendments",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <Amendments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/advisory",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <Advisory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/notifications",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <LegalNotifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/settings",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <LegalSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal-expert/profile",
    element: (
      <ProtectedRoute requiredRole="legal-expert">
        <LegalProfile />
      </ProtectedRoute>
    ),
  },
]);
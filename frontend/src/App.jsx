import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "./pages/SplashScreen";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/dashboard/HomePage";
import ToolsPage from "./pages/dashboard/ToolsPage";
import ToolWorkspacePage from "./pages/tools/ToolWorkspacePage";
import GrammarCheckerPage from "./pages/tools/GrammarCheckerPage";
import PlagiarismCheckerPage from "./pages/tools/PlagiarismCheckerPage";
import TemplatesPage from "./pages/templates/TemplatesPage";
import TemplatePreviewPage from "./pages/templates/TemplatePreviewPage";
import ResumeBuilderPage from "./pages/resume/ResumeBuilderPage";
import ResultPreviewPage from "./pages/ResultPreviewPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/profile/ProfilePage";
import HistoryPage from "./pages/profile/HistoryPage";
import SettingsPage from "./pages/profile/SettingsPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import { clearUser, fetchCurrentUser } from "./store/slices/authSlice";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      dispatch(clearUser());
      return;
    }

    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => {
        dispatch(clearUser());
      });
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/app/home" element={<HomePage />} />
          <Route path="/app/tools" element={<ToolsPage />} />
          <Route path="/tools/humanizer" element={<ToolWorkspacePage type="humanizer" />} />
          <Route path="/tools/paraphraser" element={<ToolWorkspacePage type="paraphraser" />} />
          <Route path="/tools/grammar" element={<GrammarCheckerPage />} />
          <Route path="/tools/plagiarism" element={<PlagiarismCheckerPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:templateId" element={<TemplatePreviewPage />} />
          <Route path="/resume/builder" element={<ResumeBuilderPage />} />
          <Route path="/result-preview" element={<ResultPreviewPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

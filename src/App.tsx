
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./components/chatbot/Chatbot";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SchemeFinderPage from "./pages/SchemeFinderPage";
import NotificationPreferences from "./pages/NotificationPreferences";
import PersonalizedSchemeFinderPage from "./pages/PersonalizedSchemeFinderPage";
import ServicesPage from "./pages/ServicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TranslationProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/schemes" element={<SchemeFinderPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/personalized-finder" element={<PersonalizedSchemeFinderPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requiredRole="citizen">
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute requiredRole="citizen">
                    <NotificationPreferences />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </AuthProvider>
      </TranslationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import RequestPage from "@/pages/RequestPage";
// import TrackPage from "@/pages/TrackPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import AdminLoginPage from "./pages/AdminLoginPage";
import DocumentsPage from "@/pages/DocumentsPage";
import AdminDocumentsPage from "@/pages/AdminDocumentsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/request" element={<RequestPage />} />
                {/* <Route path="/track" element={<TrackPage />} /> */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
<Route path="/admin/login" element={<AdminLoginPage />} />
<Route path="/admin/documents" element={<AdminDocumentsPage />} />



                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

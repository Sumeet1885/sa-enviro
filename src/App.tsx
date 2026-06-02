import { lazy, Suspense } from "react";
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout, Footer } from "@/components/layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Product = lazy(() => import("./pages/product/Product"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Client = lazy(() => import("./pages/Client"));
const Contact = lazy(() => import("./pages/Contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex h-[70vh] w-full items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-water-sky border-t-transparent"></div>
  </div>
);

const App = () => (

  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Suspense fallback={null}>
          <Toaster />
          <Sonner />
        </Suspense>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/client" element={<Client />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:slug" element={<Blogs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </Suspense>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

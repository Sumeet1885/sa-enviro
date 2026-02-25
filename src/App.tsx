import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/product/Product";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Team from "@/pages/Team";
import Client from "./pages/Client";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";

import NotFound from "./pages/NotFound";



const queryClient = new QueryClient();

const App = () => (

  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/team" element={<Team />} />
              <Route path="/client" element={<Client />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:slug" element={<Blogs />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

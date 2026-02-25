import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSlideInParallax } from "@/hooks/useSlideInParallax";

// ─── Hook: fires once when element enters the viewport ───────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Form component ───────────────────────────────────────────────────────────
export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const { ref, inView } = useInView();
  const { ref, translateY } = useSlideInParallax(500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(-${translateY}px)`,
        transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
        willChange: "transform, opacity",
      }}
    >
      <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Send Us a Message
        </h2>
        {isSubmitted ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Thank You!
            </h3>
            <p className="text-muted-foreground">
              We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <Input placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input type="tel" placeholder="+91 00000 00000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <Input placeholder="Company name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Interested In
              </label>
              <Input placeholder="e.g., Water Treatment Plant, RO System" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <Textarea
                placeholder="Tell us about your requirements..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message
              <Send className="w-5 h-5 ml-2" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

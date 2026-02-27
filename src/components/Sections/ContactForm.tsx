import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSlideInParallax } from "@/hooks/useSlideInParallax";
import emailjs from "@emailjs/browser";

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

// ─── Types ───────────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Validation ──────────────────────────────────────────────────────────────
export const validateContactForm = (
  formData: FormData,
): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {};

  // ─── NAME ───────────────────────────────────────────
  if (!formData.name?.trim()) {
    errors.name = "Name is required.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (formData.name.trim().length > 50) {
    errors.name = "Name must not exceed 50 characters.";
  } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
    errors.name =
      "Name can only contain letters, spaces, hyphens, or apostrophes.";
  }

  // ─── EMAIL ──────────────────────────────────────────
  if (!formData.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address. (e.g. user@example.com)";
  } else if (formData.email.trim().length > 100) {
    errors.email = "Email must not exceed 100 characters.";
  }

  // ─── PHONE ──────────────────────────────────────────
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-()\[\]]{7,15}$/.test(formData.phone.trim())) {
    errors.phone = "Enter a valid phone number. (e.g. +1 234 567 8900)";
  }

  // ─── COMPANY ────────────────────────────────────────
  if (!formData.company?.trim()) {
    errors.company = "Company name is required.";
  } else if (formData.company.trim().length < 2) {
    errors.company = "Company name must be at least 2 characters.";
  } else if (formData.company.trim().length > 100) {
    errors.company = "Company name must not exceed 100 characters.";
  }

  // ─── SERVICE ────────────────────────────────────────
  if (!formData.service?.trim()) {
    errors.service = "Please select a service.";
  }

  // ─── MESSAGE ────────────────────────────────────────
  if (!formData.message?.trim()) {
    errors.message = "Message is required.";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (formData.message.trim().length > 1000) {
    errors.message = "Message must not exceed 1000 characters.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// ─── Form Component ───────────────────────────────────────────────────────────
export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 Loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { ref, translateY } = useSlideInParallax(400);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      name,
      email,
      phone,
      company,
      service,
      message,
    };
    const { errors: validationErrors, isValid } = validateContactForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Clear errors & start loading
    setErrors({});
    setIsLoading(true);

    const MESSAGE = `
      Respected Sir/Madam,

      This is ${name}, representing ${company || "N/A"}.
      I would like to inquire about ${service || "your services"}.

      You may reach me at ${phone.slice(0, 3) + " " + phone.slice(4) || "N/A"} or ${email}.

      Message:
      ${message}

      Looking forward to your response.

      Sincerely,
      ${name}
    `.trim();

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE || "",
        { user_email: email, user_message: MESSAGE },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setService("");
      setMessage("");
      setIsSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message ❌");
    } finally {
      setIsLoading(false); // 👈 Always stop loading
    }
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
            {/* ── Name & Email ── */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: "" }));
                  }}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((p) => ({ ...p, email: "" }));
                  }}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* ── Phone & Company ── */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((p) => ({ ...p, phone: "" }));
                  }}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <Input
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    setErrors((p) => ({ ...p, company: "" }));
                  }}
                  disabled={isLoading}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                )}
              </div>
            </div>

            {/* ── Service ── */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Interested In
              </label>
              <Input
                placeholder="e.g., Water Treatment Plant, RO System"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setErrors((p) => ({ ...p, service: "" }));
                }}
                disabled={isLoading}
              />
              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            {/* ── Message ── */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <Textarea
                placeholder="Tell us about your requirements..."
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrors((p) => ({ ...p, message: "" }));
                }}
                disabled={isLoading}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* ── Submit Button ── */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading} // 👈 Disabled while loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

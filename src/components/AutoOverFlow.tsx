import React, { useState, useRef, useEffect } from "react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AutoFlowLayoutProps {
  product: {
    image: string;
  };
  services: Service[];
  title?: string;
  description?: string;
}

const AutoFlowLayout: React.FC<AutoFlowLayoutProps> = ({
  product,
  services,
  title = "We built our business on great customer service",
  description = "At the beginning at least, but then we realized we could make a lot more money if we kinda stopped caring about that. Our new strategy is to write a bunch of things that look really good in the headlines, then clarify in the small print but hope people don't actually read it.",
}) => {
  const [needsOverflow, setNeedsOverflow] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (imageContainerRef.current && contentContainerRef.current) {
        const imageHeight = imageContainerRef.current.offsetHeight;
        const contentHeight = contentContainerRef.current.scrollHeight;

        // If content is taller than image, overflow to full width
        if (contentHeight > imageHeight + 50) {
          // 50px buffer
          setNeedsOverflow(true);
        } else {
          setNeedsOverflow(false);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    const timer = setTimeout(checkOverflow, 100);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timer);
    };
  }, [title, description, services]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div ref={imageContainerRef} className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-black/10 border-2">
            <img
              src={product.image}
              alt="Workspace"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentContainerRef}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-12 leading-relaxed">{description}</p>

          {/* Services Grid - Only show here if NOT overflowing */}
          {!needsOverflow && (
            <div className="grid sm:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4 text-gray-700">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overflow Section - Services Grid in Full Width */}
      {needsOverflow && (
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="grid sm:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-gray-700">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoFlowLayout;

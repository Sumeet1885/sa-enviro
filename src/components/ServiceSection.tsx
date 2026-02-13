import React, { useState } from "react";

type ProductType = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  layout: string;
};

type ServiceSectionProps = {
  layout?: "1" | "2" | "3";
  product: ProductType;
};

const ServiceSection = ({ layout, product }: ServiceSectionProps) => {
  const services = [
    {
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M3 6h18M3 12h18M3 18h18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Free shipping",
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M9 2l1 2M15 2l-1 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "10-year warranty",
      description:
        "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M7 8h10M7 12h4M7 16h10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
          <path
            d="M8 2v4M16 2v4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Exchanges",
      description:
        "If you don't like it, trade it for one of your friends for something of theirs. Don't send it here though.",
    },
  ];

  // Layout 1: Image Left, Content Right
  const Layout1 = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-black/10 border-2">
            <img
              src={product.image}
              alt="Workspace"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We built our business on great customer service
          </h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            At the beginning at least, but then we realized we could make a lot
            more money if we kinda stopped caring about that. Our new strategy
            is to write a bunch of things that look really good in the
            headlines, then clarify in the small print but hope people don't
            actually read it.
            
          </p>

          {/* Services Grid */}
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
      </div>
    </div>
  );

  // Layout 2: Image Right, Content Left
  const Layout2 = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Section */}
        <div className="lg:order-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We built our business on great customer service
          </h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            At the beginning at least, but then we realized we could make a lot
            more money if we kinda stopped caring about that. Our new strategy
            is to write a bunch of things that look really good in the
            headlines, then clarify in the small print but hope people don't
            actually read it.
          </p>

          {/* Services Grid */}
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

        {/* Image Section */}
        <div className="relative lg:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={product.image}
              alt="Workspace"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Layout 3: Image Center, Content Below
  const Layout3 = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center">
        {/* Image Section */}
        <div className="relative w-full max-w-4xl mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=500&fit=crop"
              alt="Workspace"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We built our business on great customer service
          </h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            At the beginning at least, but then we realized we could make a lot
            more money if we kinda stopped caring about that. Our new strategy
            is to write a bunch of things that look really good in the
            headlines, then clarify in the small print but hope people don't
            actually read it.
          </p>

          {/* Services Grid */}
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
      </div>
    </div>
  );

  // Render based on layout prop
  return (
    <div className="bg-white">
      {layout === "1" && <Layout1 />}
      {layout === "2" && <Layout2 />}
      {layout === "3" && <Layout3 />}
    </div>
  );
};

// Demo ServiceSection Component
// function Component() {
//   const [layout, setLayout] = useState("1");

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Layout Switcher */}
//       <div className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <h1 className="text-xl font-bold text-gray-900">
//               Service Section Component
//             </h1>
//             <div className="flex gap-3 flex-wrap">
//               <button
//                 onClick={() => setLayout("1")}
//                 className={`px-6 py-2 rounded-lg font-medium transition-all ${
//                   layout === "1"
//                     ? "bg-gray-900 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Layout 1
//               </button>
//               <button
//                 onClick={() => setLayout("2")}
//                 className={`px-6 py-2 rounded-lg font-medium transition-all ${
//                   layout === "2"
//                     ? "bg-gray-900 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Layout 2
//               </button>
//               <button
//                 onClick={() => setLayout("3")}
//                 className={`px-6 py-2 rounded-lg font-medium transition-all ${
//                   layout === "3"
//                     ? "bg-gray-900 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Layout 3
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Service Section with selected layout */}
//       <ServiceSection layout={layout} />

//       {/* Info Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-xl shadow-md p-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Component Usage
//           </h2>
//           <div className="space-y-4">
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm font-semibold text-gray-700 mb-2">
//                 Layout 1 - Image Left, Content Right:
//               </p>
//               <code className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                 &lt;ServiceSection layout="1" /&gt;
//               </code>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm font-semibold text-gray-700 mb-2">
//                 Layout 2 - Image Right, Content Left:
//               </p>
//               <code className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                 &lt;ServiceSection layout="2" /&gt;
//               </code>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm font-semibold text-gray-700 mb-2">
//                 Layout 3 - Image Center, Content Below:
//               </p>
//               <code className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                 &lt;ServiceSection layout="3" /&gt;
//               </code>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default ServiceSection;

import React, { useState } from "react";
import Text from "@/components/ui/Used/Text";
import Extra_Text_Section from "@/components/ui/dynamic_Text";
import { Product } from "@/constants/type";

type ServiceSectionProps = {
  layout?: "1" | "2" | "3";
  product: Product;
};

const content: { title: string; description: string } = {
  title: "We built our business on great customer service",
  description:
    "At the beginning at least, but then we realized we could make a lot more money if we kinda stopped caring about that. Our new strategy is to write a bunch of things that look really good in the headlines, then clarify in the small print but hope people don't actually read it.",
};

const Image_Section = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={imageSrc}
        alt="Workspace"
        className="w-full h-[400px] object-cover"
      />
    </div>
  );
};

const Content_Text_Section = ({
  className,
  content,
}: {
  className: string;
  content: { title: string; description: string };
}) => {
  return (
    <div className={className}>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
      <p className="text-gray-600 mb-12 leading-relaxed">
        {content.description}
      </p>
    </div>
  );
};
const ProductContentSection = ({ layout, product }: ServiceSectionProps) => {
  // Layout 1: Image Left, Content Right
  const Layout1 = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-10">
        {/* Image Section */}
        <div className="relative">
          <Image_Section imageSrc={product.images[0].url} />
        </div>

        {/* Content Section */}

        <Content_Text_Section className="" content={product.main} />
      </div>
      {product.Page_Description && (
        <Extra_Text_Section extraContent={product.Page_Description} />
      )}
    </div>
  );

  // Layout 2: Image Right, Content Left
  const Layout2 = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Section */}
        <Content_Text_Section className="lg:order-1" content={content} />

        {/* Image Section */}
        <div className="relative lg:order-2">
          <Image_Section imageSrc={product.image} />
        </div>
      </div>
      {product.Page_Description && (
        <Extra_Text_Section extraContent={product.Page_Description} />
      )}
    </div>
  );

  // Layout 3: Image Center, Content Below
  const Layout3 = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
      <div className="flex flex-col items-center">
        {/* Image Section */}
        <div className="relative w-full max-w-4xl mb-12">
          <Image_Section imageSrc={product.images[0].url} />
        </div>

        {/* Content Section */}
        <Content_Text_Section
          className="text-center max-w-4xl"
          content={content}
        />
      </div>
      {product.Page_Description && (
        <Extra_Text_Section extraContent={product.Page_Description} />
      )}
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

// Demo ProductContentSection Component
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
//       <ProductContentSection layout={layout} />

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
//                 &lt;ProductContentSection layout="1" /&gt;
//               </code>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm font-semibold text-gray-700 mb-2">
//                 Layout 2 - Image Right, Content Left:
//               </p>
//               <code className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                 &lt;ProductContentSection layout="2" /&gt;
//               </code>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm font-semibold text-gray-700 mb-2">
//                 Layout 3 - Image Center, Content Below:
//               </p>
//               <code className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                 &lt;ProductContentSection layout="3" /&gt;
//               </code>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default ProductContentSection;

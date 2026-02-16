import { Star, Truck, Shield, RotateCcw } from "lucide-react";

interface ProductInfoProps {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  sizes: string[];
}

export default function ProductInfo({
  name,
  price,
  rating,
  reviews,
  description,
  features,
  sizes,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2"></div>

        <p className="text-3xl font-light text-gray-900">${price.toFixed(2)}</p>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">{description}</p>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Select Size</h3>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              className="px-6 py-3 border border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-900"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Features</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 transition-colors mb-3 text-sm font-medium tracking-wide">
          Add to Cart
        </button>
        <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-900 py-4 px-8 transition-colors text-sm font-medium">
          Add to Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">Free Shipping</p>
            <p className="text-xs text-gray-600">On orders over $100</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">Easy Returns</p>
            <p className="text-xs text-gray-600">30-day return policy</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">Secure Payment</p>
            <p className="text-xs text-gray-600">SSL encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

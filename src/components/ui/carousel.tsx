import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({
  images,
  autoPlay = true,
  interval = 4000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative h-56 overflow-hidden rounded-base md:h-96">
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-1.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>

        <div
          className="hidden duration-700 ease-in-out"
          data-carousel-item="active"
        >
          <img
            src="/docs/images/carousel/carousel-2.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-3.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-4.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="/docs/images/carousel/carousel-5.svg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
      </div>

      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-5 h-5 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-5 h-5 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

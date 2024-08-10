import { useEffect, useRef, useState } from "react";

interface TabProps {
    labels: string[];
  }
  
  const Tabs: React.FC<TabProps> = ({ labels }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
  
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };
  
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
      }
    };
  
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
      }
    };
  
    useEffect(() => {
      handleScroll(); // Check position initially
    }, []);
  
    return (
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => {
              scrollLeft();
              setTimeout(handleScroll, 100); // Adjust arrows after scroll
            }}
            className="absolute left-0 z-10 h-full px-2 bg-white bg-opacity-70 text-gray-700 hover:text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
  
        {/* Tabs */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-300 py-2 mx-2"
        >
          {labels.map((label, index) => (
            <div
              key={index}
              className={`inline-block px-4 py-2 cursor-pointer ${
                index === 0 ? "font-bold text-black" : "font-medium text-gray-600"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
  
        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => {
              scrollRight();
              setTimeout(handleScroll, 100); // Adjust arrows after scroll
            }}
            className="absolute right-0 z-10 h-full px-2 bg-white bg-opacity-70 text-gray-700 hover:text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    );
  };

export default function Testing() {
    const labels = [
        "For you",
        "Following",
        "JavaScript",
        "Life",
        "Business",
        "Cryptocurrency",
        "Psychology",
        "Health",
        "Science",
        "Education",
        "Technology",
        "Sports",
    ];

    return (
        <div>
            <Tabs labels={labels} />
        </div>
    );
}
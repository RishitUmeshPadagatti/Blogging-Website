import { useEffect, useRef, useState } from "react";

export const TagsNavbar = () => {
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

    const tagsResponse = [
        {
            "id": "8c58d296-c0d7-45c5-a28d-3e4421f85719",
            "name": "AI"
        },
        {
            "id": "d1fd96cc-d168-4fd2-a2bf-1d2f80c1acee",
            "name": "Health"
        },
        {
            "id": "706e7da4-1064-4eac-9f4d-485201dbfc59",
            "name": "Productivity"
        },
        {
            "id": "b009d346-efda-4f70-9c53-3d37867ae656",
            "name": "Technology"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        },
        {
            "id": "8c015c31-5b0b-43c3-a22f-0e32938a1c98",
            "name": "Workplace"
        }
    ]

    return (
        <nav className="border border-black w-[600px] flex-col hidden gap-6 h-[100%] text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={() => {
                        scrollLeft();
                        setTimeout(handleScroll, 100);
                    }}
                    className="relative left-0 z-10 h-full px-2 bg-white bg-opacity-70 text-gray-700 hover:text-black focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Tabs */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-hidden whitespace-nowrap scrollbar-hide py-2 mx-2">
                <div className="inline-block px-4 py-2 cursor-pointer font-medium text-gray-600">For you</div>
                {tagsResponse.map((element) => {
                    return <div key={element.id} className={`inline-block px-4 py-2 cursor-pointer font-medium text-gray-600`}>
                        {element.name}
                    </div>
                })}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={() => {
                        scrollRight();
                        setTimeout(handleScroll, 100);
                    }}
                    className="relative right-0 z-10 h-full px-2 bg-white bg-opacity-70 text-gray-700 hover:text-black focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </nav>
    )
}
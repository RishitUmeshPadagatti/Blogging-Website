import React, { useEffect, useRef, useState } from "react";
import {TagsNavbarProps} from "../../interfaces/interface"


export const TagsNavbar: React.FC<TagsNavbarProps> = ({tags}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth)
    }
  }

  useEffect(handleScroll, [tags])

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" })
      setTimeout(handleScroll, 100)
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" })
      setTimeout(handleScroll, 100)
    }
  }

  return (
      <div className="px-4 mb-2 md:px-6 py-2 overflow-x-hidden flex justify-between">
        <button onClick={scrollLeft} className={`pr-2 ${showLeftArrow ? "" : "invisible"}`}><LeftArrow/></button>

        <div ref={scrollRef} className="flex gap-6 md:gap-10 overflow-x-hidden">
          <div className="whitespace-nowrap cursor-pointer">For you</div>
          {tags.map((element) => {
            return <div key={element.id} className="whitespace-nowrap cursor-pointer">{element.name}</div>
          })}
        </div>

        <button onClick={scrollRight} className={`pl-2 ${showRightArrow ? "" : "invisible"}`}><RightArrow/></button>
      </div>
  )
}

const LeftArrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

const RightArrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
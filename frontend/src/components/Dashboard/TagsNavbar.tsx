import { useEffect, useRef, useState } from "react";
import { Tag } from "../../interfaces/interface";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTagAtom, serverLocationAtom } from "../../atom/atoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

function useTags(n: number): [Tag[], boolean] {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const serverLocation = useRecoilValue(serverLocationAtom);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await axios.get(`${serverLocation}/tag/tags`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
        },
      });
      setTags(result.data.tags);
    } catch (error) {
      console.error("Failed to fetch data", error);
      localStorage.clear();
      navigate("/signuporsignin");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const value = setInterval(() => {
      getData();
    }, n * 1000);

    getData();

    return () => {
      clearInterval(value);
    };
  }, [n]);

  return [tags, loading];
}

export const TagsNavbar = () => {
  const [tags, tagsLoading] = useTags(60);

  let tagsContent;

  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagChange = async (tagName: string) => {
    setIsSubmitting(true)
    setCurrentTag(tagName)
    setIsSubmitting(false)
  }

  // Handling Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(handleScroll, [tags]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
      setTimeout(handleScroll, 100);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
      setTimeout(handleScroll, 100);
    }
  };

  if (tagsLoading) {
    tagsContent = <div className="flex justify-center items-center w-full"><ReactLoading type="balls" color="#000000" /></div>;
  } else {
    tagsContent = (
      <div className="px-4 mb-2 md:px-6 py-2 overflow-x-hidden flex justify-between">
        <button
          onClick={scrollLeft}
          className={`pr-2 ${showLeftArrow ? "" : "invisible"}`}>
          <LeftArrow />
        </button>

        <div ref={scrollRef} className="flex gap-6 md:gap-10 overflow-x-hidden">
          <div className={`whitespace-nowrap cursor-pointer ${currentTag === "" ? "font-extrabold" : ""}`} onClick={() => {
            if(!isSubmitting) { handleTagChange("") }
          }}>For you</div>
          {tags.map((element) => {
            return (<div key={element.id} className={`whitespace-nowrap cursor-pointer ${currentTag === element.name ? "font-extrabold" : ""}`} onClick={() => {
              if (!isSubmitting) { handleTagChange(element.name) }
            }} >
              {element.name}
            </div>
            )
          })}
        </div>

        <button onClick={scrollRight} className={`pl-2 ${showRightArrow ? "" : "invisible"}`}>
          <RightArrow />
        </button>
      </div>
    );
  }

  return tagsContent;
};

const LeftArrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
};

const RightArrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};

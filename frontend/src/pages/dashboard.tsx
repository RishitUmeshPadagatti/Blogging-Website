import axios from "axios";
import { useEffect, useState } from "react";
import { serverLocationAtom } from "../atom/atoms";
import { useRecoilValue } from "recoil";
import { PenIcon } from "../components/PenIcon";
import { profileInitials } from "../functions/profileInitials";
import { formatDate } from "../functions/formatDate";
import { v4 as uuidv4 } from 'uuid';

interface Tag {
  id: string,
  name: string
}

function useBlogs(n: number): {
  id: string,
  title: string,
  content: string,
  published: boolean,
  created: string,
  author: {
    name: string
  },
  authorId: string,
  tags: Tag[]
} {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const serverLocation = useRecoilValue(serverLocationAtom)

  const getData = async () => {
    try {
      const result = await axios.get(`${serverLocation}/blog/bulk`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization")
        }
      })
      setBlogs(result.data.blogs)
    } catch (error) {
      console.error("Failed to fetch data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const value = setInterval(() => {
      getData()
    }, n * 1000);

    getData()

    return () => {
      clearInterval(value)
    }
  }, [n])

  return [blogs, loading]
}

function useTags(n: number): Tag[] {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const serverLocation = useRecoilValue(serverLocationAtom)

  const getData = async () => {
    try {
      const result = await axios.get(`${serverLocation}/tag/tags`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization")
        }
      })
      setTags(result.data.tags)
    } catch (error) {
      console.error("Failed to fetch data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const value = setInterval(() => {
      getData()
    }, n * 1000);

    getData()

    return () => {
      clearInterval(value)
    }
  }, [n])

  return [tags, loading]
}

export default function Dashboard() {
  const [blogs, blogsLoading] = useBlogs(100)
  const [tags, tagsLoading] = useTags(100)

  console.log(blogs, tags)

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a className="font-bold">
            For you
          </a>
          <a className="text-gray-500">
            JavaScript
          </a>
          <a className="text-gray-500">
            Life
          </a>
          <a className="text-gray-500">
            Business
          </a>
          <a className="text-gray-500">
            Cryptocurrency
          </a>
          <a className="text-gray-500">
            Psychology
          </a>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <PenIcon className="h-5 w-5" />
            <span className="sr-only">Write</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Avatar initials="BL" />
          </button>
        </div>
      </header>


      <main className="flex flex-col py-2 md:p-10 space-y-12">
        {blogs.map((element: { title: string; content: string; author: { name: string; }; tags: Tag[]; created: string; }) => {
          return <BlogComponent
            key={uuidv4()}
            title={element.title}
            content={element.content}
            author={element.author.name}
            tags={element.tags}
            created={formatDate(element.created)}
          />
        })}

      </main>
    </div>
  );
}

interface BlogComponentProps {
  title: string;
  content: string;
  author: string;
  tags: Tag[];
  created: string;
}

const BlogComponent: React.FC<BlogComponentProps> = ({ title, content, author, tags, created }) => {
  const currentTag: string = "AI"

  return (
    <div className="flex gap-2 md:gap-6 rounded px-3 py-2 ">
      <div>
        <Avatar initials={profileInitials(author)} />
      </div>
      <div className="space-y-2 md:space-y-3">
        <p className="text-sm font-medium">{author}</p>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-500">{content}</p>
        <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-500 cursor-default flex-wrap">
          <div>{created}</div>
            {tags.map((element) => {
              return <div key={uuidv4()} className={`px-3 py-1 rounded-full whitespace-nowrap ${currentTag==element.name ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>{element.name}</div>
            })}
        </div>
      </div>
    </div>
  );
};

interface AvatarProps {
  initials: string;
}

const Avatar: React.FC<AvatarProps> = ({ initials }) => {
  return (
    <div className="bg-gray-200 cursor-pointer rounded-full h-[40px] w-[40px] flex items-center justify-center text-[18px] font-semibold text-gray-800">
      {initials}
    </div>
  );
}
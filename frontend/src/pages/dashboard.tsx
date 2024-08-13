import axios from "axios";
import { useEffect, useState } from "react";
import { serverLocationAtom } from "../atom/atoms";
import { useRecoilValue } from "recoil";
import { PenIcon } from "../components/PenIcon";
import { formatDate } from "../functions/formatDate";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { BlogComponent } from "../components/BlogComponent";
import { Avatar } from "../components/Avatar";
import { Blog, Tag } from "../interfaces/interface";
import { profileInitials } from "../functions/profileInitials";
import { TagsNavbar } from "../components/TagsNavbar";


function useBlogs(n: number): [Blog[], boolean] {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const serverLocation = useRecoilValue(serverLocationAtom)
  const navigate = useNavigate()

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
      localStorage.clear()
      navigate("/signuporsignin")
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

function useTags(n: number): [Tag[], boolean] {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const serverLocation = useRecoilValue(serverLocationAtom)
  const navigate = useNavigate()

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
      localStorage.clear()
      navigate("/signuporsignin")
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
        <TagsNavbar/>

        <div className="flex items-center ml-auto gap-2">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <PenIcon className="h-5 w-5" />
            <span className="sr-only">Write</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Avatar initials={profileInitials((JSON.parse(localStorage.getItem("UserDetails") || "")).name)} />
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
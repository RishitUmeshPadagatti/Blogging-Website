import axios from "axios";
import { useEffect, useState } from "react";
import { serverLocationAtom } from "../atom/atoms";
import { useRecoilValue } from "recoil";

function useBlogs() {
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
    }, 10 * 1000);

    getData()

    return () => {
      clearInterval(value)
    }
  }, [])

  return [blogs, loading]
}

function useTags() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const serverLocation = useRecoilValue(serverLocationAtom)

  const getData = async () => {
    try {
      const result = await axios.get(`${serverLocation}/tag/tags`, {
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
    }, 10 * 1000);

    getData()

    return () => {
      clearInterval(value)
    }
  }, [])

  return [blogs, loading]
}

export default function Dashboard() {
  const [blogs, blogsLoading] = useBlogs()
  const [tags, tagsLoading] = useTags()

  console.log(blogs)

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="#" className="font-bold">
            For you
          </a>
          <a href="#" className="text-gray-500">
            Following
          </a>
          <a href="#" className="text-gray-500">
            JavaScript
          </a>
          <a href="#" className="text-gray-500">
            Life
          </a>
          <a href="#" className="text-gray-500">
            Business
          </a>
          <a href="#" className="text-gray-500">
            Cryptocurrency
          </a>
          <a href="#" className="text-gray-500">
            Psychology
          </a>
        </nav>
        <div className="flex items-center ml-auto gap-2">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <PenIcon className="h-5 w-5" />
            <span className="sr-only">Write</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <AvatarFallback initials="BL" />
          </button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-12 p-4 md:gap-12 md:p-10">
        <div className="space-y-12">
          <Article
            author="Bella"
            initials="BL"
            title="Can You Pass This Apple-Orange Interview At Apple 🍎?"
            description="The iPhone Company's Interview Question"
            date="Mar 14, 2023"
          />
          <Article
            author="Luke Hollomon"
            initials="LH"
            title="Bumblebees Might Be Cultured—This Could Change Everything"
            description="A tiny puzzle box and two itty-bitty bees may have changed how we think about animal behavior and the uniqueness of our..."
            date="Jun 24, 2023"
          />
          <Article
            author="Alexandre Kassiantchouk"
            initials="AK"
            title='Why "Nothing" Cannot Move Faster Than Light? Or Can It?'
            description='And it is not a double negative ❗ 😮 Or what is "Nothing" ❓'
            date="Jul 21, 2023"
          />
          <Article
            author="Brad Yonaka"
            initials="BY"
            title='Why "Nothing" Cannot Move Faster Than Light? Or Can It?'
            description='And it is not a double negative ❗ 😮 Or what is "Nothing" ❓'
            date="Jul 21, 2023"
          />
        </div>
      </main>
    </div>
  );
}

function Article({ author, initials, title, description, date }) {
  return (
    <div className="flex gap-6">
      <AvatarFallback initials={initials} />
      <div className="space-y-3">
        <p className="text-sm font-medium">{author}</p>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-500">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

function AvatarFallback({ initials }) {
  return (
    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-lg font-semibold text-gray-800">
      {initials}
    </div>
  );
}

function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

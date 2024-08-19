import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useRecoilValue } from "recoil";
import { serverLocationAtom } from "../atom/atoms";
import axios from "axios";
import { ErrorPage } from "../components/ErrorPage";
import ReactLoading from 'react-loading'
import { Editor } from "../components/CreateBlog/Editor";

interface BlogInterfaceWithoutTagId {
    id: string;
    title: string;
    content: string;
    published: boolean;
    created: string;
    author: {
        name: string;
    };
    authorId: string;
    tags: [{
        name: string
    }];
}

function useBlogInformation(blogId: string) {
    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    const serverLocation = useRecoilValue(serverLocationAtom)

    useEffect(() => {
        axios.get(`${serverLocation}/blog/${blogId}`, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
            .then(async (res) => {
                setBlog(res.data.blog)
                setSuccess(res.data.success)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return [blog, loading, success]
}

export default function UpdateBlog() {
    const blogId = localStorage.getItem("updateBlogId") || ""

    const [blogInformation, loading, success] = useBlogInformation(blogId || "") as [BlogInterfaceWithoutTagId, boolean, boolean]

    let viewContentDOM;

    if (loading) {
        viewContentDOM = (<div>
            <div className="h-[90vh] flex justify-center items-center"><ReactLoading type="balls" color="#000000" /></div>
        </div>)
    }

    else if (!loading && !success) {
        viewContentDOM = (<div>
            <ErrorPage/>
        </div>)
    }

    else if (!loading && success){
        const tagsArray = blogInformation.tags.map(e => e.name)
        viewContentDOM = (
            <Editor blogId={blogId} titleContent={blogInformation.title} blogContent={blogInformation.content} tagsContent={tagsArray}/>
        )
    }

    return <div>
        <Navbar/>
        {viewContentDOM}
    </div>
}
import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import React, { useEffect, useState } from "react"
import { Avatar } from "../components/Avatar"
import { profileInitials } from "../functions/profileInitials"
import axios from "axios"
import { useRecoilValue } from "recoil"
import { serverLocationAtom } from "../atom/atoms"
import ReactLoading from 'react-loading'
import { Blog } from "../interfaces/interface"
import { formatDate } from "../functions/formatDate"
import { ErrorPage } from "../components/ErrorPage"

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

export default function ViewBlog() {
    const navigate = useNavigate()
    
    const blogId = useParams().blogId

    const [blogInformation, loading, success] = useBlogInformation(blogId || "") as [Blog, boolean, boolean]

    let viewContent;

    if (loading) {
        viewContent = (<div>
            <div className="h-[90vh] flex justify-center items-center"><ReactLoading type="balls" color="#000000" /></div>
        </div>)
    }

    else if (!loading && !success) {
        viewContent = (<div>
            <ErrorPage/>
        </div>)
    }

    else if (!loading && success) {
        viewContent = (<div className="flex justify-center">
                <div className="w-[95vw] md:w-[70vw] lg:w-[50vw]">
                    <div className="mt-5 overflow-hidden w-full text-5xl font-serif cursor-default">
                        {blogInformation.title}
                    </div>

                    <div className="mt-5 flex gap-3 items-center">
                        <div onClick={() => navigate(`/profile/${blogInformation.authorId}`)}>
                            <Avatar initials={profileInitials(blogInformation.author.name)} size={47} />
                        </div>
                        <div>
                            <div onClick={() => navigate(`/profile/${blogInformation.authorId}`)} className="cursor-pointer hover:underline font-medium">{blogInformation.author.name}</div>
                            <div className="cursor-default text-gray-500 text-sm">{formatDate(blogInformation.created)}</div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <ul className="flex gap-2 md:gap-4 flex-wrap">
                            {blogInformation.tags.map((element) => {
                                return <li key={element.name}><Capsule name={element.name} /></li>
                            })}
                        </ul>
                    </div>

                    <div className="my-8 w-full text-xl font-serif flex-wrap cursor-default leading-9">
                        {blogInformation.content}
                    </div>
                </div>
            </div>)
    }

    return (<>
        <Navbar />
        {viewContent}
    </>
    )
}

const Capsule: React.FC<{ name: string }> = ({ name }) => {
    return <div className={'px-3 py-1 rounded-full cursor-default whitespace-nowrap bg-gray-200 text-gray-800'}>
        {name}
    </div>
}
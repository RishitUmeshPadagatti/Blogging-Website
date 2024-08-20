import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil";
import { isSubmittingAtom, serverLocationAtom } from "../atom/atoms";
import axios from "axios";
import { Blog, ServerUserResponse } from "../interfaces/interface";
import { Navbar } from "../components/Navbar";
import ReactLoading from 'react-loading'
import { ErrorPage } from "../components/ErrorPage";
import { Avatar } from "../components/Avatar";
import { profileInitials } from "../functions/profileInitials";
import { formatDate } from "../functions/formatDate";
import { SetToastContainer } from "../components/ToastComponents";

function useUserInformation(authorId: string) {
    const [userInformation, setUserInformation] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    const serverLocation = useRecoilValue(serverLocationAtom)

    useEffect(() => {
        axios.get(`${serverLocation}/user/getblogs/${authorId}`, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
            .then(async (res) => {
                setUserInformation(res.data.user)
                setSuccess(res.data.success)
            })
            .catch(() => {
                setSuccess(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return [userInformation, loading, success]
}

export default function ProfileView() {
    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingAtom)
    const serverLocation = useRecoilValue(serverLocationAtom)

    const authorId: string = useParams().authorId || ""
    const tempUsersId = JSON.parse(localStorage.getItem("UserDetails") || "{}").id

    let isUsersAccount: boolean;
    if (window.location.pathname === "/profile/me"){
        isUsersAccount = true
    } else{
        isUsersAccount = authorId === tempUsersId
    }

    const [userInformation, loading, success] = useUserInformation(authorId || tempUsersId) as [ServerUserResponse, boolean, boolean]

    let userContentDOM;

    if (loading) {
        userContentDOM = (<div>
            <div className="h-[90vh] flex justify-center items-center"><ReactLoading type="balls" color="#000000" /></div>
        </div>)
    }

    else if (!loading && !success) {
        userContentDOM = (<div>
            <ErrorPage />
        </div>)
    }

    else if (!loading && success) {
        userContentDOM = (<div className="">
            <div className=" flex justify-center items-center flex-col gap-10 py-20">
                <Avatar initials={profileInitials(userInformation.name)} size={100} />
                <div className="text-3xl md:text-5xl font-semibold cursor-default">{userInformation.name}</div>
            </div>
            <div>
                {userInformation.posts.length==0 ? <div className="w-full h-[50vh] flex justify-center items-center cursor-default text-4xl font-serif ">No Blogs</div> : userInformation.posts.map((element: Blog) => {
                    return (
                        <div key={element.id} className="flex flex-col space-y-2 md:space-y-3 border rounded-xl m-2 md:m-7 px-4 md:px-5 py-5 md:py-7">
                            <div className="flex md:justify-between flex-col lg:flex-row gap-5">
                                <div className="max-h-[80px] overflow-hidden">
                                    <h2 onClick={() => navigate(`/view/${element.id}`)} className=" text-xl font-bold hover:underline cursor-pointer">{element.title}</h2>
                                </div>
                                <div>
                                    {isUsersAccount &&
                                        <div className="flex gap-1.5">
                                            <button 
                                                className="border rounded-lg px-3.5 py-0.5 font-semibold"
                                                onClick={() => {
                                                    localStorage.setItem("updateBlogId", element.id)
                                                    navigate("/update-blog")
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button className={`border rounded-lg px-3.5 py-0.5 font-semibold hover:text-white ${element.published ? "hover:bg-gray-600" : "hover:bg-green-600"} ${isSubmitting ? "cursor-wait" : ""}`} onClick={() => {
                                                if (element.published) { handleUnPublish(element.id) }
                                                else { handlePublish(element.id) }
                                            }}>
                                                {element.published ? "Unpublish" : "Publish"}
                                            </button>

                                            <button
                                                className={`border rounded-lg px-3.5 py-0.5 font-semibold hover:bg-red-500 hover:text-white ${isSubmitting ? "cursor-wait" : ""}`}
                                                onClick={() => handleDelete(element.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    }
                                </div>

                            </div>
                            <div className="cursor-default text-sm text-gray-500">{formatDate(element.created)}</div>

                            <p className=" max-h-[100px] overflow-hidden text-gray-500 cursor-default">{element.content}</p>

                            <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-500 flex-wrap">
                                {element.tags.map((tag) => {
                                    return <Capsule key={tag.name} name={tag.name} />
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>)
    }

    const handlePublish = async (blogId: string) => {
        setIsSubmitting(true)

        try {
            await axios.post(`${serverLocation}/blog/publish/${blogId}`, null, {
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            window.location.reload()
        }
    }

    const handleUnPublish = async (blogId: string) => {;
        setIsSubmitting(true)

        try {
            await axios.post(`${serverLocation}/blog/unpublish/${blogId}`, null, {
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            window.location.reload()
        }
    }

    const handleDelete = async (blogId: string) => {
        setIsSubmitting(true)

        try {
            await axios.delete(`${serverLocation}/blog/${blogId}`, {
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            window.location.reload()
        }
    }

    return <>
        <SetToastContainer />
        <Navbar />
        {userContentDOM}
    </>
}

const Capsule: React.FC<{ name: string }> = ({ name }) => {
    return <div className={'px-3 py-1 rounded-full cursor-default whitespace-nowrap bg-gray-200 text-gray-800'}>
        {name}
    </div>
}
import { profileInitials } from "../../functions/profileInitials";
import { Blog } from "../../interfaces/interface"
import { CapsuleProps } from "../../interfaces/interface";
import { formatDate } from "../../functions/formatDate";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { blogsSelector, currentTagAtom, isSubmittingAtom } from "../../atom/atoms";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading'
import { Avatar } from "../Avatar";

export const MainBlogComponent = () => {
    const navigate = useNavigate()
    const blogsTemp = useRecoilValueLoadable(blogsSelector)

    let blogsContent;

    if (blogsTemp.state === "loading") {
        blogsContent = <div className="h-[90vh] flex justify-center items-center"><ReactLoading type="balls" color="#000000" /></div>
    }

    else if (blogsTemp.state === "hasError") {
        console.log("error")
        localStorage.clear()
        navigate("/")
        return null;
    }

    else if (blogsTemp.state === "hasValue") {
        const blogs = blogsTemp.contents.blogs;
        // console.log(blogs)
        blogsContent = (
            <main className="flex flex-col py-2 md:p-10 space-y-12">
                {blogs.map((element: Blog) => {
                    return (
                        <div key={element.id} className="flex gap-2 md:gap-6 rounded px-3 py-2 ">
                            <div onClick={() => navigate(`/profile/${element.authorId}`)}>
                                <Avatar initials={profileInitials(element.author.name)} size={40} />
                            </div>
                            <div className="space-y-2 md:space-y-3">
                                <p onClick={() => navigate(`/profile/${element.authorId}`)} className="text-sm font-medium hover:underline cursor-pointer">{element.author.name}</p>
                                <h2 onClick={() => navigate(`/view/${element.id}`)} className="text-xl max-h-[80px] font-bold hover:underline cursor-pointer">{element.title}</h2>
                                <p className=" max-h-[100px] overflow-hidden text-gray-500 cursor-default font-serif">{element.content}</p>
                                <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-500 cursor-default flex-wrap">
                                    <div>{formatDate(element.created)}</div>
                                    {element.tags.map((element) => {
                                        return <Capsule key={element.name} name={element.name} />
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        )
    }

    return (<>
        {blogsContent}
    </>)
}

function Capsule({ name }: CapsuleProps) {
    const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom)
    const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingAtom);

    const handleTagChange = async (tagName: string) => {
        setIsSubmitting(true)
        setCurrentTag(tagName)
        setIsSubmitting(false)
    }

    return <div className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${currentTag == name ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => {
        if (!isSubmitting) {
            if (currentTag === name) {
                handleTagChange("")
            }
            else {
                handleTagChange(name)
            }
        }
    }}>{name}</div>
}
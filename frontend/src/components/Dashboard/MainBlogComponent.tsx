import { profileInitials } from "../../functions/profileInitials";
import { Avatar } from "./Avatar";
import { BlogComponentProps, Tag } from "../../interfaces/interface"
import { CapsuleProps } from "../../interfaces/interface";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../../functions/formatDate";
import React from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { blogsSelector, currentTagAtom, isSubmittingAtom } from "../../atom/atoms";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading'

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
        navigate("/signuporsignin")
        return null;
    }

    else if (blogsTemp.state === "hasValue") {
        const blogs = blogsTemp.contents.blogs;
        blogsContent = (
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
        )
    }

    return (<>
        {blogsContent}
    </>)
}

const BlogComponent: React.FC<BlogComponentProps> = ({ title, content, author, tags, created }) => {
    return (
        <div className="flex gap-2 md:gap-6 rounded px-3 py-2 ">
            <div>
                <Avatar initials={profileInitials(author)} />
            </div>
            <div className="space-y-2 md:space-y-3">
                <p className="text-sm font-medium">{author}</p>
                <h2 className="text-xl max-h-[80px] font-bold">{title}</h2>
                <p className=" max-h-[100px] overflow-hidden text-gray-500">{content}</p>
                <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-500 cursor-default flex-wrap">
                    <div>{created}</div>
                    {tags.map((element) => {
                        return <Capsule key={uuidv4()} name={element.name}/>
                    })}
                </div>
            </div>
        </div>
    );
};

function Capsule({ name }: CapsuleProps) {
    const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom)
    const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingAtom);

    const handleTagChange = async (tagName: string) => {
        setIsSubmitting(true)
        setCurrentTag(tagName)
        setIsSubmitting(false)
    }

    return <div className={`px-3 py-1 rounded-full cursor-pointer whitespace-nowrap ${currentTag == name ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => {
        if (!isSubmitting) { handleTagChange(name) }
    }}>{name}</div>
}
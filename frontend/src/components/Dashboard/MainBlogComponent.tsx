import { profileInitials } from "../../functions/profileInitials";
import { Avatar } from "./Avatar";
import { BlogComponentProps, Blog, Tag } from "../../interfaces/interface"
import { CapsuleProps } from "../../interfaces/interface";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../../functions/formatDate";
import React from "react";

export const MainBlogComponent: React.FC<{ blogs: Blog[] }>= ({blogs}) => {
    return (<>
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
    </>)
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
                <h2 className="text-xl max-h-[80px] font-bold">{title}</h2>
                <p className=" max-h-[100px] overflow-hidden text-gray-500">{content}</p>
                <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-500 cursor-default flex-wrap">
                    <div>{created}</div>
                    {tags.map((element) => {
                        return <Capsule key={uuidv4()} name={element.name} currentTag={currentTag}/>
                    })}
                </div>
            </div>
        </div>
    );
};

function Capsule ({name, currentTag}: CapsuleProps) {
    return <div className={`px-3 py-1 rounded-full whitespace-nowrap ${currentTag == name ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>{name}</div>
}
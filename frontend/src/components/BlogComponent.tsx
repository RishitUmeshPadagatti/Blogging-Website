import { profileInitials } from "../functions/profileInitials";
import { Avatar } from "./Avatar";
import {BlogComponentProps} from "../interfaces/interface"
import { v4 as uuidv4 } from 'uuid';

export const BlogComponent: React.FC<BlogComponentProps> = ({ title, content, author, tags, created }) => {
    const currentTag: string = "AI"

    return (
        <div className="flex gap-2 md:gap-6 rounded px-3 py-2 ">
            <div>
                <Avatar initials={profileInitials(author)} />
            </div>
            <div className="space-y-2 md:space-y-3">
                <p className="text-sm font-medium">{author}</p>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className=" max-h-[100px] overflow-hidden text-gray-500">{content}</p>
                <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-500 cursor-default flex-wrap">
                    <div>{created}</div>
                    {tags.map((element) => {
                        return <div key={uuidv4()} className={`px-3 py-1 rounded-full whitespace-nowrap ${currentTag == element.name ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>{element.name}</div>
                    })}
                </div>
            </div>
        </div>
    );
};
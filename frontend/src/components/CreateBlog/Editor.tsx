import React, { useEffect, useRef, useState } from "react"
import { multipleWordsToATag } from "../../functions/multipleWordsToATag"
import { v4 as uuidv4 } from "uuid";
import { IoMdClose } from "react-icons/io";
import { errorToast, SetToastContainer } from "../ToastComponents";
import { Tag } from "../../interfaces/interface";
import { useRecoilState, useRecoilValueLoadable} from "recoil";
import { isUploadableBlogAtom, publishBlogAtom, tagsAtom } from "../../atom/atoms";
import { blogParams, createBlogSchema } from "@rishit1275/blogging-website-package";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
const debouncedTime = 5

const createBlog = async (object: blogParams) => {
    const serverLocation = localStorage.getItem("serverLocation")

    try {
        const result = await axios.post(`${serverLocation}/blog`, object, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        localStorage.setItem("updateBlogId" ,result.data.blog.id)
    } catch (error) {
        console.log(error)    
    }
};
const updateBlog = async (object: blogParams) => {
    const serverLocation = localStorage.getItem("serverLocation")

    const blogId = localStorage.getItem("updateBlogId")

    try {
        await axios.put(`${serverLocation}/blog/${blogId}`, object, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
    } catch (error) {
        console.log(error)
    }
};
const publishBlogServer = async (object: blogParams) => {
    await updateBlog(object)

    const serverLocation = localStorage.getItem("serverLocation")
    const blogId = localStorage.getItem("updateBlogId")

    try {
        await axios.post(`${serverLocation}/blog/publish/${blogId}`, null, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
    } catch (error) {
        console.log(error)
    }
};

const debouncedCreateBlog = debounce(createBlog, debouncedTime * 1000);
const debouncedUpdateBlog = debounce(updateBlog, debouncedTime * 1000);

export const Editor: React.FC<{ blogId?: string, titleContent?: string, blogContent?: string, tagsContent?: string[] }> = ({ blogId, titleContent, blogContent, tagsContent }) => {
    const [title, setTitle] = useState<string>(titleContent || "");
    const titleTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const [blog, setBlog] = useState<string>(blogContent || '');
    const blogTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const [tags, setTags] = useState<string[]>(tagsContent || []);
    const [tagInputBox, setTagInputBox] = useState<string>('');
    const [filteredTags, setFilteredTags] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    // Not checking the state
    const tagsTemp = useRecoilValueLoadable(tagsAtom);
    const tagsServer = tagsTemp.contents.tags as Tag[];

    const [isUploadableBlog, setIsUploadableBlog] = useRecoilState<boolean>(isUploadableBlogAtom);
    const [publishBlog, setPublishBlog] = useRecoilState<boolean>(publishBlogAtom);

    const [isBlogCreated, setIsBlogCreated] = useState<boolean>(!!blogId);

    const navigate = useNavigate()

    if (blogId) {
        useEffect(() => {
            localStorage.setItem("updateBlogId", blogId)

            return () => {
                localStorage.removeItem("updateBlogId")
            }
        }, [blogId])
    }

    useEffect(() => {
        if (publishBlog === true) {
            const object = { title: title, content: blog, tags: tags };
            publishBlogServer(object)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                })
                .finally(() => {
                    setPublishBlog(false);
                });
        }
    }, [publishBlog]);

    const debouncedUploadBlog = (object: blogParams) => {
        if (!isBlogCreated) {
            debouncedCreateBlog(object);
            setIsBlogCreated(true);
        } else {
            debouncedUpdateBlog(object);
        }
    };

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (tags.length >= 10) {
            errorToast("Maximum 10 tags");
        } else if (e.key === 'Enter' && tagInputBox.trim() !== "") {
            const newTag = multipleWordsToATag(tagInputBox);
            const hasUniqueTags = !tags.includes(newTag);

            if (hasUniqueTags) {
                setTags([...tags, newTag]);
                setTagInputBox('');
            } else {
                errorToast("Tags have to be unique");
            }
        }
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setTagInputBox(input);
        const filtered = tagsServer
            .filter(tag => tag.name.toLowerCase().includes(input.toLowerCase()) && !tags.includes(tag.name))
            .map(tag => tag.name);
        setFilteredTags(filtered);
        setShowSuggestions(true);
    };

    const handleTagClick = (tagName: string) => {
        if (tags.length >= 10) {
            errorToast("Maximum 10 tags");
        } else {
            setTags([...tags, tagName]);
            setTagInputBox('');
            setFilteredTags([]);
            setShowSuggestions(false);
        }
    };

    const removeTag = (name: string) => {
        setTags(tags.filter((tag) => tag !== name));
    };

    useEffect(() => {
        if (titleTextAreaRef.current) {
            titleTextAreaRef.current.style.height = 'auto';
            titleTextAreaRef.current.style.height = `${titleTextAreaRef.current.scrollHeight}px`;
        }
        if (blogTextAreaRef.current) {
            blogTextAreaRef.current.style.height = 'auto';
            blogTextAreaRef.current.style.height = `${blogTextAreaRef.current.scrollHeight}px`;
        }

        const object = { title: title, content: blog, tags: tags };

        const parsingResult: boolean = createBlogSchema.safeParse(object).success;
        if (isUploadableBlog !== parsingResult) {
            setIsUploadableBlog(parsingResult);
        }

        if (parsingResult === true) {
            debouncedUploadBlog(object);
        }

    }, [isUploadableBlog, title, blog, tags]);

    return <>
        <SetToastContainer />
        <div className=" flex justify-center">
            <div className="w-[95vw] md:w-[70vw] lg:w-[50vw]">
                <textarea
                    placeholder="Title"
                    className="mt-5 resize-none overflow-hidden outline-none w-full text-5xl font-serif placeholder:text-gray-400"
                    value={title}
                    ref={titleTextAreaRef}
                    onChange={(e) => setTitle(e.target.value)} />

                <div className="mt-4">
                    <ul className="flex gap-2 md:gap-4 flex-wrap">
                        {tags.map((tag) => (
                            <li key={uuidv4()}><Capsule name={tag} removeTag={removeTag} /></li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder={`${tags.length >= 10 ? "Maximum 10 tags" : "Add a Tag"}`}
                        className="w-full outline-none font-serif text-base placeholder:text-gray-400"
                        value={tagInputBox}
                        onChange={handleTagInputChange}
                        onKeyDown={addTag} />
                    {showSuggestions && tagInputBox && (
                        <div className="absolute z-10 bg-white border shadow-md">
                            {filteredTags.map(tag => (
                                <div
                                    key={uuidv4()}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleTagClick(tag)}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <textarea
                    placeholder="Tell your story..."
                    className="my-10 resize-none overflow-hidden outline-none w-full text-xl font-serif flex-wrap placeholder:text-gray-400 leading-9"
                    value={blog}
                    ref={blogTextAreaRef}
                    onChange={(e) => setBlog(e.target.value)} />
            </div>
        </div>
    </>
}

const Capsule: React.FC<{ name: string, removeTag: Function }> = ({ name, removeTag }) => {
    return <div className="px-3 py-1 rounded-full cursor-default whitespace-nowrap bg-gray-200 text-gray-800 text-sm flex justify-center font-serif items-center">
        {name}
        <button onClick={() => {
            removeTag(name)
        }} className="rounded-full ml-2 w-[20px] h-[20px] cursor-pointer hover:bg-gray-300 flex justify-center items-center"><IoMdClose /></button>
    </div>
}
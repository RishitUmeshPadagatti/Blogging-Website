import { useEffect, useRef, useState } from "react";
import { profileInitials } from "../functions/profileInitials";
import { Avatar } from "./Avatar";
import { PenIcon } from "./Dashboard/PenIcon";
import mediumLogo from '../assets/mediumLogo.svg'
import { useLocation, useNavigate } from "react-router-dom";
import { IconsNavbar } from "./CreateBlog/iconsNavbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUploadableBlogAtom, publishBlogAtom } from "../atom/atoms";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()
    const isInCreateBlog = useLocation().pathname == "/create-blog" ? true : false
    const isInUpdateBlog = useLocation().pathname == "/update-blog" ? true : false
    const isUploadableBlog: boolean = useRecoilValue(isUploadableBlogAtom)
    const setPublishBlog = useSetRecoilState(publishBlogAtom)

    useEffect(() => {
        if (!localStorage.getItem("UserDetails")) {
            localStorage.clear()
            navigate("/")
        }
    }, [])


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
            <img className="md:w-[100px] w-[75px] cursor-pointer" src={mediumLogo} alt="Medium Logo" onClick={() => navigate("/dashboard")} />

            {(isInCreateBlog || isInUpdateBlog) && <IconsNavbar />}

            <div className="flex items-center ml-auto gap-2">
                {!isInCreateBlog && !isInUpdateBlog && <button className="p-2 rounded-full" onClick={() => {
                    navigate("/create-blog")
                }}>
                    <PenIcon className="h-5 w-5" />
                    <span className="sr-only">Write</span>
                </button>}

                {(isInCreateBlog || isInUpdateBlog) && <button onClick={() => {
                    if (isUploadableBlog) setPublishBlog(true)
                }} className={`${isUploadableBlog ? "cursor-pointer" : "cursor-not-allowed bg-green-700"} bg-green-600 hover:bg-green-700 font-light text-sm md:text-base text-white px-2 md:px-3 py-[1px] rounded-2xl`}>
                    Publish
                </button>}

                <div ref={dropdownRef} className="relative">
                    <div className="p-2 rounded-full cursor-pointer" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
                        <Avatar initials={profileInitials(JSON.parse(localStorage.getItem("UserDetails") || "{}").name)} size={40} />
                    </div>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                            <ul>
                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => {
                                    navigate(`/profile/me`)
                                }}>Profile</li>
                                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => {
                                    localStorage.clear()
                                    navigate("/")
                                }}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

import { PenIcon } from "../components/Dashboard/PenIcon";
import { Avatar } from "../components/Dashboard/Avatar";
import { profileInitials } from "../functions/profileInitials";
import { TagsNavbar } from "../components/Dashboard/TagsNavbar";
import mediumLogo from '/mediumLogo.svg'
import { MainBlogComponent } from "../components/Dashboard/MainBlogComponent";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <nav className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <img className="md:w-[100px] w-[75px]" src={mediumLogo} alt="" />

        <div className="flex items-center ml-auto gap-2">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <PenIcon className="h-5 w-5" />
            <span className="sr-only">Write</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Avatar initials={profileInitials((JSON.parse(localStorage.getItem("UserDetails") || "")).name)} />
          </button>
        </div>
      </nav>
      <div>
        <TagsNavbar/>
      </div>

      <MainBlogComponent/>
      
    </div>
  );
}
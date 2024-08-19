import { TagsNavbar } from "../components/Dashboard/TagsNavbar";
import { MainBlogComponent } from "../components/Dashboard/MainBlogComponent";
import { Navbar } from "../components/Navbar";


export default function Dashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />

      <div>
        <TagsNavbar />
      </div>

      <MainBlogComponent />

    </div>
  );
}
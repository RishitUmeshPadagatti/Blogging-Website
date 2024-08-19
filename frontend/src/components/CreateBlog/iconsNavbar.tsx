import { IoIosCloudDone } from "react-icons/io";
import { VscCloudUpload } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { isUploadableBlogAtom } from "../../atom/atoms";

export const IconsNavbar = () => {
    const isUploadableBlog: boolean = useRecoilValue(isUploadableBlogAtom)
    
    if (isUploadableBlog){
        return (
            <div>
                {/* {<VscCloudUpload size={26} className="mx-3 md:mx-5 cursor-pointer"/>} */}
                {<IoIosCloudDone size={26} className="mx-3 md:mx-5 cursor-pointer"/>}
            </div>
        )
    }
    else {
        return ""
    }
}
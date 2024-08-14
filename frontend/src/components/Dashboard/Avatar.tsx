import { AvatarProps } from "../../interfaces/interface";
export const Avatar: React.FC<AvatarProps> = ({ initials }) => {
    return (
        <div className="bg-gray-200 cursor-pointer rounded-full h-[40px] w-[40px] flex items-center justify-center text-[18px] font-semibold text-gray-800">
            {initials}
        </div>
    );
}
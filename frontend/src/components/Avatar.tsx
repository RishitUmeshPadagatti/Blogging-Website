import { AvatarProps } from "../interfaces/interface";

export const Avatar: React.FC<AvatarProps> = ({ initials, size = 40 }) => {
    return (
        <div
            className={`bg-gray-200 cursor-pointer rounded-full flex items-center justify-center font-semibold text-gray-800`}
            style={{ height: `${size}px`, width: `${size}px`, fontSize: `${size*0.45}px` }}>
            {initials}
        </div>
    );
}
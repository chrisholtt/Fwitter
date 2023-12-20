import { User } from "@prisma/client";

import useActiveList from "../hooks/useActiveList";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarProps {
    user?: User;
    isLarge?: boolean;
    clickable?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({
    user,
    isLarge,
    clickable
}) => {
    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;
    const router = useRouter();

    const handleClick = () => {
        router.push("/users/" + user?.id)
    }

    if (!user) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className="relative">
            <div onClick={handleClick} className={`
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        ${clickable ? "cursor-pointer" : "cursor-default"}
        ${isLarge ? "w-20 h-20" : "h-9 w-9"}
        ${isLarge ? "md:w-18 h-18" : "h-11 w-11"}
      `}>
                <Image
                    fill
                    src={user?.image || user?.profileImage || '/images/placeholder.png'}
                    alt="Avatar"
                />
            </div>
            {isActive ? (
                <span
                    className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
                />
            ) : null}
        </div>
    );
}

export default Avatar;
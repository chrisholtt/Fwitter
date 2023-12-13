import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";
const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="
        rounded-full 
        max-h-[80px]
        max-w-[80px]
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <Image width={100} height={100} alt="logo" className="w-full" src="images/logo.svg" />
    </div>
  );
};

export default SidebarLogo;

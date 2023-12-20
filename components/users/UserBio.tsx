import { useEffect, useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";
import { FaCrown } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";

import { useRouter } from 'next/router';
import { useCallback } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";
import useWalletModal from "@/hooks/useWalletModal";
import SidebarItem from "@/components/layout/SidebarItem"
import Button from "../Button";
import axios from "axios";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();


  const editModal = useEditModal();
  const walletModal = useWalletModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const handleMessage = useCallback(() => {
    // setIsLoading(true);
    axios.post("/api/conversations", { userId: userId })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`)
      }).finally(() => {
        // setisLoaing(false)
      })
  }, [userId, router])

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <>
            <Button label="Wallet" onClick={walletModal.onOpen} />
            <Button secondary label="Edit" onClick={editModal.onOpen} />
          </>
        ) :
          (
            <>
              <SidebarItem
                key={"2"}
                alert={false}
                auth={true}
                href={`/messages/${userId}`}
                icon={LuMessagesSquare}
                label={"Message"}
                isGradient={false}
                onClick={handleMessage}
              />
              <Button onClick={toggleFollow} label={isFollowing ? 'Subsribed' : 'Subscribe'} secondary={!isFollowing} />
            </>
          )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">
            {fetchedUser?.bio}
          </p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
            <BiCalendar size={24} />
            <p>
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.postCount}</p>
            <p className="text-neutral-500">Posts</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default UserBio;
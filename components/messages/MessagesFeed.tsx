import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import useMessages from "@/hooks/useMessages";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import Avatar from "../Avatar";
import { User } from "@prisma/client"
import UserBox from "./UserBox";


const MessageFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: users = [] } = useMessages(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (users.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  return (
    // <div className="flex flex-col">
    //   {users.map((user: User) => (
    //     <div key={user.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
    //       <Avatar userId={user.id} key={user.id} />
    //       <p className="text-white">
    //         {user.bio}
    //       </p>
    //     </div>
    //   ))}
    // </div>
    <>

      <aside className="
      fixed
      inset-y-0
      pb-20
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
      block 
      w-full
      left-0
      ">
        <div className="px-4">
          <div className="flex-col">
            <div className="
              text-2xl
              font-bold
              text-neutal-800
              py-4
            ">
              {users.map((user: User) => {
                return (
                  <UserBox userId={user.id} name={user.name as string} />
                )
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MessageFeed;
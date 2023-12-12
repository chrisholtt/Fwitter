import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import useMessages from "@/hooks/useMessages";
import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { BiBody } from "react-icons/bi";
import Avatar from "../Avatar"
import Button from "../Button";


interface NotificationsFeedProps {
  userId: string;
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({ userId }) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  const { data: fetchedMessages = [], sendMessage } = useMessages(currentUser?.id);
  const { data: fetchedUser } = useUser(userId);

  const [body, setBody] = useState("")

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  const handleSend = () => {
    return null;
  }

  if (fetchedMessages.length === 0) {
    return (
      <>
        <div className="text-neutral-600 text-center p-6 text-xl">
          Start conversation
        </div>

        <Avatar userId={fetchedUser?.id} isLarge hasBorder />


        <textarea
          disabled={false}
          onChange={(event) => setBody(event.target.value)}
          value={body}
          className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
          placeholder="Write a message">
        </textarea>
        <Button label="Send" onClick={handleSend} />
      </>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedMessages.map((message: Record<string, any>) => (
        <div key={message.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {message.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotificationsFeed;
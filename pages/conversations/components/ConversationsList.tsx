import { useEffect, useState } from "react";
import ConversationBox from "./ConversationBox";
import { Conversation } from "@prisma/client";
import { useRouter } from "next/router";
import useConversation from "@/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FullConversationType } from "@/types";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();


  return (
    <div>

      <div className="
        rounded-full
        w-min
        p-2
        text-white
        cursor-pointer
        hover:bg-slate-300 
        hover:bg-opacity-10 
        transition
      ">
        <MdOutlineGroupAdd size={20} />
      </div>

      {items?.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationId === item.id}
        />
      ))}

    </div>
  );
}

export default ConversationList;
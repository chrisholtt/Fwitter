import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client"
import React, { useMemo, useState } from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from "./ProfileDrawer"


interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
};

const ConversationHeader: React.FC<HeaderProps> = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const statusText = useMemo(() => {
        if (conversation?.isGroup) {
            return `${conversation?.users?.length} members`;
        }
        return 'Active'
    }, [conversation])




    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="flex gap-3 items-center justify-between">
                <div className="flex">
                    <Avatar user={otherUser} clickable />
                    <div className="flex flex-col text-white">
                        <div>
                            {conversation?.name || otherUser?.name}
                        </div>
                        <div className="
                    text-sm
                    font-light
                ">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="
                    text-white
                    transition
                "
                />
            </div>
        </>

    )
}

export default ConversationHeader;
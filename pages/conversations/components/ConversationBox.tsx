import Avatar from '@/components/Avatar'
import React, { useCallback, useState, useMemo } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { format } from 'date-fns';
import { FullConversationType } from "@/types/index";
import useOtherUser from '@/hooks/useOtherUser';
import { useSession } from 'next-auth/react';

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();


    const router = useRouter();
    const [isLoading, setisLoaing] = useState(false);


    const handleClick = useCallback(() => {
        setisLoaing(true);
        router.push(`/conversations/${data.id}`);
    }, [data, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage || !userEmail) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        return seenArray.filter((user) => user.email == userEmail).length != 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return 'Started a conversation';
    }, [lastMessage])

    return (
        <div onClick={handleClick}
            className="
        border-b-[1px] 
        border-neutral-800 
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-900 
        transition
        cursor-pointer
        p-3
        ">
            <Avatar userId={otherUser.id} />
            <div className="min-w-0 flex-1">
                <div className='focus:outline-none'>
                    <div className="
                            flex 
                            justify-between 
                            items-center 
                            mb-1"
                    >
                        <p className='
                            text-md
                            font-medium
                            text-white'
                        >
                            {/* display group chat name, else, other persons name */}
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className='
                                text-xs
                                text-zinc-100
                                font-light
                            '>
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={`
                        text-sm 
                        ${hasSeen ? 'text-zinc-200' : 'text-white font-medium'}

                        `}>
                        {lastMessageText}
                    </p>

                </div>
            </div>


        </div >

    )
}

export default ConversationBox
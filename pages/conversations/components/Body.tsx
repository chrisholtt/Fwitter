import { FullMessageType } from '@/types'
import React, { useState, useRef, useEffect } from 'react'
import useConversation from "@/hooks/useConversation"
import MessageBox from "./MessageBox"
import axios from 'axios';
import { ClipLoader } from "react-spinners";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/seen/${conversationId}`)
    }, [conversationId]);


    if (!messages) {
        return (
            <ClipLoader />
        )
    }


    return (
        <div className='flex-1 overflow-y-auto'>
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i == messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24">
            </div>
        </div>
    )
}

export default Body
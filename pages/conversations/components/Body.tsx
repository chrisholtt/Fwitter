import { FullMessageType } from '@/types'
import React, { useState, useRef, useEffect } from 'react'
import useConversation from "@/hooks/useConversation"
import MessageBox from "./MessageBox"
import axios from 'axios';

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    // TODO Configure route for this, not sure on routing 
    useEffect(() => {
        axios.post(`/api/conversations/seen/${conversationId}`)
    }, [conversationId]);

    // useEffect(() => {
    //     axios.post("/api/conversations/seen", { conversationId: conversationId })
    // }, [conversationId]);

    if (!messages) {
        return (
            <div>
                loading
            </div>
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
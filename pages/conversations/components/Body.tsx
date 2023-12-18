import { FullMessageType } from '@/types'
import React, { useState, useRef } from 'react'
import useConversation from "@/hooks/useConversation"


interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    return (
        <div className='flex-1 overflow-y-auto'>
            {messages.map((message, i) => {
                <MessageBox
                    isLast={i == messages.length - 1}
                    key={message.id}
                    data={message}
                />
            })}
            <div ref={bottomRef} className="pt-24">

            </div>
        </div>
    )
}

export default Body
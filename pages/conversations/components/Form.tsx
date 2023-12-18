import useConversation from '@/hooks/useConversation'
import React from 'react'

const Form = () => {
    const { conversationId } = useConversation();
    return (
        <div>Form</div>
    )
}

export default Form
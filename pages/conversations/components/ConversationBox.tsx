import Avatar from '@/components/Avatar'
import React, { useCallback, useState, useMemo } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { format } from 'date-fns';
import { getServerSession } from 'next-auth';
import { FullConversationType } from "@/types/index";


interface ConversationBoxProps {
    data: FullConversationType;
    selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const router = useRouter();
    const [isLoading, setisLoaing] = useState(false);


    const handleClick = useCallback(() => {
        setisLoaing(true);

        axios.post("/api/conversations", { userId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`)
            }).finally(() => {
                setisLoaing(false)
            })
    }, [data, router])

    return (

        <div
            onClick={() => handleClick()}
            className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
            <div className="flex flex-row items-start gap-3">
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <Avatar userId={data.id} />
                        <p
                            onClick={() => null}
                            className="
                                    text-white 
                                    font-semibold 
                                    cursor-pointer 
                                    hover:underline
                                ">
                            {data.name}
                        </p>
                        <span
                            onClick={() => null}
                            className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
                            @{data.name}
                        </span>
                    </div>

                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            ">

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ConversationBox
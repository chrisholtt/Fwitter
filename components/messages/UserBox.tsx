import Avatar from '@/components/Avatar'
import { User } from "@prisma/client"
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';


type UserBoxProps = {
    userId: string;
    name: string;
}

const UserBox = ({ userId, name }: UserBoxProps) => {
    const router = useRouter();
    const [isLoading, setisLoaing] = useState(false);


    const handleClick = useCallback(() => {
        setisLoaing(true);

        axios.post("/conversations", { userId: userId })
            .then((data) => {
                router.push(`conversation/${data.data.id}`)
            }).finally(() => {
                setisLoaing(false)
            })
    }, [userId, router])

    return (
        <div className='
            w-full
            relative
            flex
            items-center
            space-x-3
            bg-white
            p-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
        '>
            <Avatar userId={userId} />
            <div className='min-w-0 flex-1'>
                <div className='focus:outline-none'>
                    <div className='
                        flex
                        justify-center
                        items-center
                        mb-1
                    '>
                        <p className='
                            text-sm
                            font-medium
                            text-gray-900
                        '>
                            {name}
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserBox
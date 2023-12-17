import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

import prisma from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { currentUser } = await serverAuth(req, res);
        const {
            userId,
            isGroup,
            members,
            name
        } = req.body;

        if (!currentUser || !currentUser?.email) {
            return res.status(401).json("unatuthorized");
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return res.status(400).json("Invalid data");
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })
            return res.status(200).json(newConversation);

        }

        const existingConverstation = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId] // Checks if there is already a 1-to-1 conversation 
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id] // Checking again just in case
                        }
                    },
                ]
            }
        })

        const singleConversation = existingConverstation[0]

        if (singleConversation) {
            return res.status(200).json(singleConversation)
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        return res.status(200).json(newConversation)

    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}
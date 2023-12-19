import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req, res);
        const { conversationId } = req.query;


        if (!currentUser.id || !currentUser.email) {
            return res.status(401).json("Unauthorized")
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId as string
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if (!conversation) {
            return res.status(401).json("Invalid ID")
        }


        const lastMessage = conversation.messages[conversation.messages.length - 1]

        if (!lastMessage) {
            return res.status(401).json(conversation);
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return res.status(200).json(updatedMessage);

    } catch (error: any) {
        console.log(error, "ERROR_MESSAGES_SEEN");
        return res.status(500).end();
    }
}
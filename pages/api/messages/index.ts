import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

import prisma from '@/libs/prismadb';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { currentUser } = await serverAuth(req, res);
        const {
            message,
            image,
            conversationId,
        } = req.body;

        if (!currentUser || !currentUser?.email) {
            return res.status(401).json("Unatuthorized");
        }

        if (!message || !conversationId) {
            return res.status(400).json("Invalid credentials");
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });
        return res.status(200).json(newMessage)
    }


    catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}
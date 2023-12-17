import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

import prisma from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { currentUser } = await serverAuth(req, res);

    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        if (!currentUser) {
            throw new Error('Invalid ID');
        }

        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })
        return res.status(200).json(conversations);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
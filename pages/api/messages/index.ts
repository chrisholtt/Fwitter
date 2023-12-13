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

        const messages = await prisma.conversation.findMany({
            where: {
                createdAt: currentUser.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                hasNotification: false,
            }
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
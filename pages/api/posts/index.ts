import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

import sharp from 'sharp'

type Post = {
  userId: string
  image: string | null
}

const blurImage = async (base64: string | null, blurSigma = 15) => {
  try {
    let mimeType, imageData
    const dataUrlParts = base64?.match(/data:(.*?);base64,(.*)/);
    if (dataUrlParts) {
      mimeType = dataUrlParts[1];
      imageData = Buffer.from(dataUrlParts[2], 'base64');
    }

    // Blur the image using Sharp
    const blurredImageData = await sharp(imageData)
      .blur(blurSigma) // You can adjust the blur strength here
      .toBuffer();

    const blurredBase64Image = `data:${mimeType};base64,${blurredImageData.toString('base64')}`;
    return blurredBase64Image;

  } catch (e) {
    console.log("Failed to blur image:" + e);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    if (req.method === 'POST') {
      const { body, images } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
          image: images
        }
      });

      return res.status(200).json(post);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;
      let posts;

      if (userId && typeof userId === 'string') {
        posts = await prisma.post.findMany({
          where: {
            userId
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      const blurredImages = await Promise.all(posts.map((post: Post) => currentUser.followingIds.includes(post.userId) || currentUser.id == post.userId ? post.image : blurImage(post.image)));
      posts.forEach((post: Post, index: number) => {
        post.image = blurredImages[index] as string | null;
      });

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
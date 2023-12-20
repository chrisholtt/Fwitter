import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    // Use a default user if conversation or users is not defined
    const defaultUser: User = {
      id: "string",
      createdAt: new Date(),
      updatedAt: new Date(),
      followingIds: [""],
      name: null,
      username: null,
      bio: null,
      email: null,
      emailVerified: null,
      image: null,
      coverImage: null,
      profileImage: null,
      hashedPassword: null,
      hasNotification: null,
      conversationIds: [],
      seenMessageIds: []
    };

    const users = conversation?.users || [defaultUser];
    const otherUser = users.find((user) => user.email !== currentUserEmail);

    return otherUser || defaultUser;
  }, [session.data?.user?.email, conversation]);

  return otherUser;
};

export default useOtherUser;

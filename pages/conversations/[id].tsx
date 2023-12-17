import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import clsx from 'clsx';
import ConversationFeed from "./components/ConversationFeed";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: '/',
  //         permanent: false,
  //       }
  //     }
  //   }

  return {
    props: {
      session
    }
  }
}


const Conversation = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header showBackArrow label="Messages" />
      <ConversationFeed />
    </>
  );
}

export default Conversation;
import Header from "@/components/Header";
import MessageFeed from "@/components/messages/MessageFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}


const Notifications = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <Header showBackArrow label="Messages" />
      <MessageFeed userId={userId as string} />
    </>
  );
}

export default Notifications;
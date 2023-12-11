import Header from "@/components/Header";
import MessagesFeed from "@/components/messages/MessagesFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

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

console.log(2)


const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Messages" />
      <MessagesFeed />
    </>
  );
}

export default Notifications;
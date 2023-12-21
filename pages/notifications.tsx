import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import serverAuth from "@/libs/serverAuth";
import { getSession, GetSessionParams } from "next-auth/react";


export async function getServerSideProps(context: GetSessionParams | undefined) {

  const session = await getSession(context);

  console.log("Notifactions compoenet" + session)
  console.log("Notifactions compoenet" + session)
  console.log("Notifactions compoenet" + session)
  console.log("Notifactions compoenet" + session)
  console.log(session)
  console.log(session)


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
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
}

export default Notifications;
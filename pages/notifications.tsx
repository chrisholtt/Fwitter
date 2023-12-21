import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import serverAuth from "@/libs/serverAuth";
import { getSession, GetSessionParams } from "next-auth/react";
import useNotifications from "@/hooks/useNotifications";
import { ClipLoader } from "react-spinners";


// export async function getServerSideProps(context: GetSessionParams | undefined) {

//   const session = await getSession(context);


//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       session
//     }
//   }
// }

const Notifications = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(currentUser?.id);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">

        <ClipLoader color="lightblue" size={80} />
      </div>

    )
  }

  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed fetchedNotifications={fetchedNotifications} isLoading />
    </>
  );
}

export default Notifications;
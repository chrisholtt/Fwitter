import Header from "@/components/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import PostFeed from '@/components/posts/PostFeed'


// export async function getServerSideProps(context: NextPageContext) {
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
  return (
    <>
      <Header showBackArrow label="Explore" />
      <PostFeed />
    </>
  );
}

export default Notifications;
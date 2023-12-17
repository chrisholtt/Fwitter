import Header from "@/components/Header";
import ConversationList from "./components/ConversationsList";
import useUserConversations from '@/hooks/useUserConversations';
import { getSession } from "next-auth/react";

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);
//   const { data: conversations } = useUserConversations();

//   console.log(session)
//   console.log(session)
//   console.log(session)
//   if (!session) {
//     console.log("no session")
//     console.log("no session")
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

// return {
//   props: {
//     session
//   }
// }
// }



const Conversations = () => {
  const { data: conversations } = useUserConversations();
  return (
    <>
      <Header showBackArrow label="Messages" />
      <ConversationList initialItems={conversations} />
    </>
  );
}

export default Conversations;
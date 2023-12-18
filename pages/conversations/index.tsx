import Header from "@/components/Header";
import ConversationList from "./components/ConversationsList";
import useUserConversations from '@/hooks/useUserConversations';
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

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
  const { data: conversations, isLoading } = useUserConversations();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label="Messages" />
      <ConversationList initialItems={conversations ?? []} />
    </>
  );
}

export default Conversations;
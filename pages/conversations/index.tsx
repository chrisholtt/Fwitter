import Header from "@/components/Header";
import ConversationList from "./components/ConversationsList";
import useUserConversations from '@/hooks/useUserConversations';
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { NextPageContext } from "next";

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
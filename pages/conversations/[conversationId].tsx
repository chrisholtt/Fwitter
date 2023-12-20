import Header from "@/components/Header";
import ConversationHeader from "./components/Header";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import { Session } from "next-auth";
import { Conversation, Message, User } from "@prisma/client";
import Body from './components/Body';
import Form from './components/Form';
import { FullMessageType } from "@/types";



interface ConversationProps {
  session: Session;
  conversation: Conversation & {
    users: User[];
  }
  messages: FullMessageType[]
}


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const { conversationId } = context.query;

  let conversation = await getConversationById(conversationId as string);
  let messages = await getMessages(conversationId as string);

  conversation = JSON.parse(JSON.stringify(conversation))
  messages = JSON.parse(JSON.stringify(messages))

  return {
    props: {
      session,
      conversation,
      messages,
    },
  };
}

const Conversation: React.FC<ConversationProps> = ({ session, conversation, messages }) => {
  const router = useRouter();
  const { conversationId } = router.query;


  if (!conversation) {
    return (
      <div>
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Messages" />
      <ConversationHeader conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </>
  );
};


export default Conversation;

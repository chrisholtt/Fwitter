import useSWR from 'swr';

import fetcher from '@/libs/fetcher';
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";


const useMessages = (userId?: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const url = userId == currentUser?.id ? `/api/messages` : `/api/messages?userId=${userId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const loginModal = useLoginModal();

  const sendMessage = (body: string) => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

  }



  return {
    data,
    error,
    isLoading,
    mutate,
    sendMessage
  }
};

export default useMessages;

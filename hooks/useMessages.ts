import useSWR from 'swr';

import fetcher from '@/libs/fetcher';
import useCurrentUser from "./useCurrentUser";


const useMessages = (userId?: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const url = userId == currentUser?.id ? `/api/messages` : `/api/messages?userId=${userId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useMessages;

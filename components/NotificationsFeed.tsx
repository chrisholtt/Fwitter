import { BsTwitter } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import { Notification, User } from "@prisma/client";

interface NotificationFeedProps {
  fetchedNotifications: Notification[];
  isLoading?: boolean;

}

const NotificationsFeed: React.FC<NotificationFeedProps> = ({
  fetchedNotifications,
  isLoading
}) => {


  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotificationsFeed;
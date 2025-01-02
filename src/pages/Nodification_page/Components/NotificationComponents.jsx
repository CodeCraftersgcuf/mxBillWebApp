import React from "react";
import NotificationCan from "./NotificationCan";
import { useQuery, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  getUnreadNotifications,
  markAllRead,
} from "../../../util/queries/accountQueries";

const NotificationComponents = () => {
  const token = Cookies.get("authToken");

  // Fetch unread notifications
  const {
    data: getUnreadNotificationsData,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    error: errorNotifications,
    refetch: refetchNotifications, // Refetch notifications after marking them as read
  } = useQuery({
    queryKey: ["getUnreadNotifications"],
    queryFn: () => getUnreadNotifications(token),
    enabled: !!token,
  });

  // Mark all notifications as read
  const {
    mutate: markAllReadMutation,
    isLoading: isMarkingAllRead,
  } = useMutation({
    mutationFn: () => markAllRead(token),
    onSuccess: () => {
      refetchNotifications(); // Refetch unread notifications after marking all as read
    },
    onError: (error) => {
      console.error("Failed to mark all notifications as read:", error);
    },
  });

  // Handle "Mark All Read" button click
  const handleMarkAllRead = () => {
    markAllReadMutation();
  };

  const notifications = getUnreadNotificationsData?.data || [];

  return (
    <div className="py-4 my-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Recent Notifications</h1>
        <button
          className="text-xl"
          onClick={handleMarkAllRead}
          disabled={isMarkingAllRead}
        >
          {isMarkingAllRead ? "Marking..." : "Mark All Read"}
        </button>
      </div>

      {/* Notification List */}
      <div className="py-4">
        {isLoadingNotifications ? (
          <p>Loading notifications...</p>
        ) : isErrorNotifications ? (
          <p className="text-red-500">Failed to load notifications.</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No unread notifications available.</p>
        ) : (
          notifications.map((notification) => (
            <NotificationCan
              key={notification.id}
              time={new Date(notification.created_at).toLocaleTimeString()}
              title={notification.title}
              date={new Date(notification.created_at).toLocaleDateString()}
              paragraph={notification.message}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationComponents;

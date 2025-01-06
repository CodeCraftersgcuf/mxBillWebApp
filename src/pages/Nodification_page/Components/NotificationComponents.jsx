import React, { useState } from "react";
import NotificationCan from "./NotificationCan";
import { useQuery, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  getUnreadNotifications,
  markAllRead,
} from "../../../util/queries/accountQueries";

const NotificationComponents = () => {
  const token = Cookies.get("authToken");

  // State to manage popup visibility and selected notification
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10); // Number of notifications to display

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
  const { mutate: markAllReadMutation, isLoading: isMarkingAllRead } =
    useMutation({
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

  // Open the popup with the selected notification's details
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsPopupVisible(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedNotification(null);
    setIsPopupVisible(false);
  };

  // Load More Notifications
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increase visible notifications by 10
  };

  const notifications = getUnreadNotificationsData?.data || [];
  const visibleNotifications = notifications.slice(0, visibleCount); // Get only the visible notifications

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
          <>
            {visibleNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)} // Open popup on click
                className="cursor-pointer"
              >
                <NotificationCan
                  time={new Date(notification.created_at).toLocaleTimeString()}
                  title={notification.title}
                  date={new Date(notification.created_at).toLocaleDateString()}
                  paragraph={notification.message}
                  isNew={!notification.read}
                />
              </div>
            ))}
            {visibleNotifications.length < notifications.length && (
              <button
                onClick={handleLoadMore}
                className="mt-4 px-4 py-2 bg-[#130534] text-white rounded-lg shadow-md hover:bg-blue-600 align-center text-center self-center"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>

      {/* Popup for Selected Notification */}
      {isPopupVisible && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedNotification.title}
            </h2>
            <p className="text-gray-500 mb-2">
              Date:{" "}
              {new Date(selectedNotification.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-500 mb-4">
              Time:{" "}
              {new Date(selectedNotification.created_at).toLocaleTimeString()}
            </p>
            <p className="text-gray-700">{selectedNotification.message}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponents;

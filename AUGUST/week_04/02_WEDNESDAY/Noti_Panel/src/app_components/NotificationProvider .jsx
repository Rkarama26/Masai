import React, { createContext, useState, useEffect, useRef } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef(null);

  // Add a new notification
  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Stop notifications
  const stopNotifications = () => clearInterval(intervalRef.current);

  // Simulate incoming notifications every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      addNotification('You have a new message');
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllAsRead, stopNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

'use client';

import React, { createContext, useContext } from 'react';
import { useToast, ToastContainer } from '@/components/ui/Toast';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const toast = useToast();

  const notify = {
    success: (message, options) => toast.success(message, options),
    error: (message, options) => toast.error(message, options),
    warning: (message, options) => toast.warning(message, options),
    info: (message, options) => toast.info(message, options),
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
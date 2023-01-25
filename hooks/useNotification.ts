import { showNotification } from '@mantine/notifications';
import { useCallback } from 'react';
import type { InAppNotification } from '@/types';

export const useNotification = (): {
  notifyInApp: (params: InAppNotification) => void;
} => {
  const notifyInApp = useCallback(
    ({
      success,
      sucessMessage,
      errorMessage = 'Something went wrong.',
    }: InAppNotification) => {
      showNotification({
        title: success ? 'Success' : 'Error',
        message: success ? sucessMessage : errorMessage,
        color: success ? 'teal' : 'red',
        autoClose: 2500,
      });
    },
    []
  );

  return {
    notifyInApp,
  };
};

export default useNotification;

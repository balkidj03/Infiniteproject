import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {http} from '../../api';

export const useServer = () => {
  const [serverRunning, setServerRunning] = useState<boolean | null>(null);
  const pingApi = () => {
    http
      .get(Config.BASE_API_URL as string)
      .then(() => setServerRunning(true))
      .catch(() => setServerRunning(true));
  };

  useEffect(() => {
    pingApi();
  }, []);

  return {serverRunning};
};

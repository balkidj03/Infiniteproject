import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainAppNavigator} from './MainAppNavigator';
import {SplashScreen} from '../components';
import {useSelector} from 'react-redux';
import {useUserSession} from '../hooks';
interface IAppNavigatorProps {
  isServerRunning: boolean | null;
  isConnected: boolean | null;
}

const MainNavigation = () => {
  const {isLoading, isAuthenticated, address} = useSelector(
    state => state.auth,
  );
  const {loadUserSession} = useUserSession();

  useEffect(() => {
    loadUserSession();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <MainAppNavigator
        addressAdded={address !== null}
        authenticated={isAuthenticated}
      />
    </NavigationContainer>
  );
};

export const AppNavigator: FC<IAppNavigatorProps> = () => {
  return <MainNavigation />;
};

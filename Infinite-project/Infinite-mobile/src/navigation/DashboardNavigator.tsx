/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomTabNavigator} from './BottomTabNavigator';
import {CustomDrawer} from '../components';

const Drawer = createDrawerNavigator();

export const DashboardNavigator = () => (
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    drawerContent={props => <CustomDrawer {...props} />}>
    <Drawer.Screen name="Dashboard" component={BottomTabNavigator} />
  </Drawer.Navigator>
);

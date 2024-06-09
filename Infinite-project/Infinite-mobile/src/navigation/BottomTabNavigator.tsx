/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen, ChatScreen, MoreScreen} from '../screens';
import {BottomTabBarIcon} from '../components';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      name="Contacts"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <BottomTabBarIcon icon="users" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Chats"
      component={ChatScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <BottomTabBarIcon icon="message-circle" focused={focused} />
        ),
      }}
    />

    <Tab.Screen
      name="More"
      component={MoreScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <BottomTabBarIcon icon="more-horizontal" focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);

import React from 'react';
import {
  Avatar,
  Box,
  Text,
  VStack,
  View,
  Button,
  useTheme,
  HStack,
  Pressable,
} from 'native-base';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/FontAwesome5';
import {DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const drawerItems = [
  {
    icon: 'user',
    label: 'My Profile',
    route: 'Profile',
  },

  {
    icon: 'clipboard-list',
    label: 'My Orders',
    route: 'Order',
  },

  {
    icon: 'wallet',
    label: 'Payment Methods',
    route: 'PaymentMethod',
  },
  {
    icon: 'envelope',
    label: 'Contact Us',
    route: 'ContactUs',
  },

  {
    icon: 'info-circle',
    label: 'Help & FAQs',
    route: 'HelpFaQ',
  },
  {
    icon: 'hammer',
    label: 'Settings',
    route: 'Settings',
  },
];

const DrawerItemsRender = ({
  item,
  color,
  onPress,
}: {
  item: any;
  color: string;
  onPress: (route: string) => void;
}) => {
  return (
    <Pressable onPress={() => onPress(item.route)}>
      {({isPressed}) => (
        <HStack
          space={'3'}
          px={'2'}
          py={'3'}
          rounded={'md'}
          alignItems={'center'}
          bgColor={isPressed ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)'}>
          <Feather color={color} name={item.icon} size={20} />
          <Text fontWeight={'semibold'}>{item.label}</Text>
        </HStack>
      )}
    </Pressable>
  );
};

export const CustomDrawer = (props: any) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const handleNavigation = (routeName: string) => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
    props.navigation.navigate(routeName);
  };

  const {isAuthenticated, user} = useSelector(state => state.auth);

  const handleNavigateProfile = () => {
    handleNavigation('Profile');
  };

  const handleLogoutUser = () => {};

  return (
    <Box flex={1} safeArea>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContainer}>
        <VStack px={'4'} pt={'2'}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleNavigateProfile}>
            <Avatar
              source={
                isAuthenticated
                  ? require('../../assets/images/avatar.jpeg')
                  : undefined
              }
              size={'lg'}
              bgColor={'gray.500'}
              mb={'2'}>
              <Feather name={'user'} size={20} color={'white'} />
            </Avatar>
          </TouchableOpacity>
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            {isAuthenticated ? `${user.full_name}` : 'Not Login'}
          </Text>
          <Text>
            {isAuthenticated ? `${user.email}` : 'Please login or register'}
          </Text>
        </VStack>
        <View flex={1} backgroundColor={'#fff'} paddingTop={10} px={'4'}>
          {drawerItems.map((item, index) => (
            <DrawerItemsRender
              key={index}
              item={item}
              color={colors.primary[700]}
              onPress={handleNavigation}
            />
          ))}
        </View>
      </DrawerContentScrollView>
      <View px={'4'} width={'70%'}>
        {isAuthenticated ? (
          <Button
            onPress={handleLogoutUser}
            size={'sm'}
            _text={{fontWeight: 'semibold', fontSize: 'md'}}
            leftIcon={
              <Avatar bgColor={'white'}>
                <Icons name={'logout'} color={colors.primary[500]} size={20} />
              </Avatar>
            }
            rounded={'full'}>
            Log Out
          </Button>
        ) : (
          <Button
            onPress={() => handleNavigation('GetStarted')}
            size={'sm'}
            rounded={'full'}
            _text={{fontWeight: 'semibold', fontSize: 'md'}}>
            Login
          </Button>
        )}
      </View>
    </Box>
  );
};

export const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#fff',
    marginTop: -50,
    zIndex: 10,
  },
});

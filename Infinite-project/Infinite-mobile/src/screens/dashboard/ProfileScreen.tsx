import {Avatar, Box, HStack, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT_USER} from '../../store/constants/auth.constants';
import {useNavigation} from '@react-navigation/native';

const moreOptions = [
  {
    name: 'Account',
    icon: 'user',
  },
  {
    name: 'Chats',
    icon: 'message-circle',
  },
  {
    name: 'Appearance',
    icon: 'sun',
  },
  {
    name: 'Notification',
    icon: 'bell',
  },
  {
    name: 'Privacy',
    icon: 'shield',
  },
  {
    name: 'Data Usage',
    icon: 'folder',
  },
  {
    name: 'Help',
    icon: 'info',
  },
  {
    name: 'Invite your friends',
    icon: 'mail',
  },
];

export const MoreScreen = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const {user} = useSelector(state => state.auth);

  const handleLogOut = async () => {
    dispatch({type: LOGOUT_USER});
  };

  return (
    <Box safeArea flex={'1'} px={'4'} bgColor={'white'}>
      <Box mt={'4'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          More
        </Text>
      </Box>
      <ScrollView flex={'1'} pt={'4'} showsVerticalScrollIndicator={false}>
        <HStack alignItems={'center'} space={'2'} my={'4'}>
          <Avatar size={'lg'} source={{uri: user?.profile}}>
            <Feather name={'user'} size={30} color={'black'} />
          </Avatar>
          <VStack flex={1}>
            <Text>{`${user?.firstName} ${user?.lastName}`}</Text>
            <Text>{user?.phone}</Text>
          </VStack>
          <Feather name={'chevron-right'} size={20} color={'black'} />
        </HStack>
        <VStack space={'3'} mt={'2'} px={'2'}>
          {moreOptions.map((option, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <HStack key={index} alignItems="center" space={'4'}>
                <Feather name={option.icon} size={25} color={'black'} />
                <Text fontSize={'lg'} flex={1}>
                  {option.name}
                </Text>
                <Feather name={'chevron-right'} size={20} color={'black'} />
              </HStack>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleLogOut}>
            <HStack alignItems="center" space={'4'} mt={'5'}>
              <Feather name={'log-out'} size={25} color={'red'} />
              <Text fontSize={'lg'} flex={1} color={'red.500'}>
                Logout
              </Text>
              <Feather name={'chevron-right'} size={20} color={'red'} />
            </HStack>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </Box>
  );
};

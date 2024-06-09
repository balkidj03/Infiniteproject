import React, {FC} from 'react';
import {
  Text,
  Avatar,
  Pressable,
  VStack,
  HStack,
  Badge,
  IconButton,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

interface IContactCard {
  online: boolean;
  profile?: string;
  title: string;
  subtitle: string;
  count?: number;
  time?: string;
  showCall?: boolean;
  onPress: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
}

export const ContactCard: FC<IContactCard> = ({
  online,
  profile,
  title,
  subtitle,
  count,
  time,
  showCall,
  onVideoCall,
  onVoiceCall,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => (
        <HStack
          space={2}
          px={'4'}
          borderBottomWidth={1}
          borderBottomColor={'gray.300'}
          py={'4'}
          bgColor={isPressed ? 'rgba(0,0,0,0.1)' : 'transparent'}>
          <Avatar bg={'primary.500'} source={{uri: profile}}>
            {online && <Avatar.Badge bg="green.500" />}
            <Text color={'white'} fontSize={'lg'} fontWeight={'semibold'}>
              {title[0]}
            </Text>
          </Avatar>
          <VStack flex={1}>
            <Text fontSize={'md'} fontWeight={'bold'}>
              {title}
            </Text>
            <Text color={'gray.500'}>{subtitle}</Text>
          </VStack>
          <VStack space={'1'} alignItems={'center'}>
            {/* <Text fontSize={'xs'}>{time}</Text> */}
            {showCall && (
              <HStack space={'2'}>
                <IconButton
                  rounded={'full'}
                  variant={'solid'}
                  onPress={onVoiceCall}
                  size={'sm'}
                  icon={<Feather name={'phone'} size={20} color={'white'} />}
                />
                <IconButton
                  rounded={'full'}
                  variant={'solid'}
                  onPress={onVideoCall}
                  size={'sm'}
                  icon={<Feather name={'video'} size={20} color={'white'} />}
                />
              </HStack>
            )}
          </VStack>
        </HStack>
      )}
    </Pressable>
  );
};

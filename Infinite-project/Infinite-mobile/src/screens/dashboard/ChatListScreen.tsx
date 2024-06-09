import {Avatar, Box, ScrollView, Image, FlatList} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {HStack, Text, Button, Input, IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ContactCard} from '../../components/contacts';
import {PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserConversations} from '../../api/auth.api';
import {SET_CONVERSATIONS} from '../../store/constants/auth.constants';
import {useAutoUpdateConversations} from '../../hooks';

export const ChatScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {conversations} = useSelector(state => state.auth);
  const [status, setStatus] = useState('');

  const {user} = useSelector(state => state.auth);

  const [contacts, setContacts] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestContactsPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts to show them.',
            buttonPositive: 'OK',
          },
        );
        setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setPermissionGranted(true);
      }
    };

    requestContactsPermission();
  }, []);

  useAutoUpdateConversations();

  useEffect(() => {
    if (permissionGranted) {
      Contacts.getAll()
        .then(contacts => {
          setContacts(contacts);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [permissionGranted]);

  const handleStartMessaging = data => {
    navigation.navigate('MessagingScreen', data);
  };

  const handleGetUserConversations = useCallback(async () => {
    const request = await getUserConversations();
    if (request.ok) {
      dispatch({type: SET_CONVERSATIONS, payload: request.data?.data});
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetUserConversations();
  }, [handleGetUserConversations]);

  const getParticipant = participants => {
    return participants.find(part => part._id !== user.id);
  };

  const userStatus = [1, 2, 3, 4, 5, 6];

  const userStatusData = userStatus.map((status, index) => ({
    key: index.toString(),
    status,
    avatarSource: `https://picsum.photos/200/3${index}0`,
  }));

  return (
    <>
      {status && (
        <Box>
          <Box safeArea position={'absolute'} zIndex={100} px={'4'}>
            <IconButton
              onPress={() => setStatus('')}
              variant={'solid'}
              rounded={'full'}
              icon={<Feather name={'x'} size={20} color={'white'} />}
            />
          </Box>
          <Image
            width={'100%'}
            height={'100%'}
            source={{uri: status}}
            alt="status"
          />
        </Box>
      )}
      <Box safeArea flex={1} pt={'4'} bgColor={'white'}>
        <HStack alignItems={'center'} justifyContent={'space-between'} px={'4'}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            Chats
          </Text>
          <HStack space={1}>
            <IconButton
              onPress={() => navigation.navigate('Contacts')}
              rounded={'full'}
              icon={
                <Feather name={'message-square'} size={20} color={'black'} />
              }
            />
            <IconButton
              rounded={'full'}
              icon={<Feather name={'check-square'} size={20} color={'black'} />}
            />
          </HStack>
        </HStack>
        <Box>
          <FlatList
            data={userStatusData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  setStatus(`https://picsum.photos/4${item.key}0/800`)
                }>
                <Avatar
                  size={'lg'}
                  borderWidth={2}
                  borderColor={'primary.400'}
                  source={{uri: item.avatarSource}}>
                  <Text>{item.status}</Text>
                </Avatar>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              marginVertical: 3,
              paddingHorizontal: 4,
            }}
            ItemSeparatorComponent={() => <Box width={2} />}
          />
        </Box>

        <Box pt={'3'} pb={'2'} px={'4'}>
          <Input
            InputLeftElement={
              <Box pl={'3'}>
                <Feather name={'search'} size={20} color={'black'} />
              </Box>
            }
            placeholder="Search"
          />
        </Box>
        <ScrollView mt={'4'} showsVerticalScrollIndicator={false}>
          {conversations.length < 1 && (
            <Box justifyContent={'center'} alignItems={'center'} mt={'10'}>
              <Text>You have no conversation at the moment</Text>
              <Button
                mt={'2'}
                rounded={'full'}
                onPress={() => navigation.navigate('Contacts')}>
                Start Conversation
              </Button>
            </Box>
          )}
          {conversations.map((contact: {[key: string]: any}, index: any) => {
            const participant = getParticipant(contact.participants);
            return (
              <ContactCard
                key={index}
                showCall={true}
                profile={contact.profile}
                online={true}
                title={`${participant?.firstName} ${participant?.lastName}`}
                count={1}
                time={'today'}
                subtitle={'Click to chat'}
                onVoiceCall={() =>
                  navigation.navigate('CallScreen', {
                    callData: {
                      name: 'Salisu Abubakar',
                      type: 'call',
                      userId: 'klsdf93993032',
                    },
                  })
                }
                onVideoCall={() =>
                  navigation.navigate('CallScreen', {
                    callData: {
                      name: 'Salisu Abubakar',
                      type: 'video',
                      userId: 'klsdf93993032',
                    },
                  })
                }
                onPress={() =>
                  handleStartMessaging({conversation: contact, participant})
                }
              />
            );
          })}
        </ScrollView>
      </Box>
    </>
  );
};

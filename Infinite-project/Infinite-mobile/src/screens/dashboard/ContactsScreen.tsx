import {Box, ScrollView} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {HStack, Text, Button, Input, IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ContactCard} from '../../components/contacts';
import {useDispatch, useSelector} from 'react-redux';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  SET_CONTACTS,
  SET_CONVERSATIONS,
} from '../../store/constants/auth.constants';
import {checkContactUser, getUserConversations} from '../../api/auth.api';

function simplifyContacts(contacts, platform) {
  return contacts.map(contact => {
    let firstName = '';
    let lastName = '';
    let phoneNumber = '';

    if (platform === 'android') {
      // Assuming Android contact structure
      // Android contact fields may vary, this is an example structure
      firstName = contact.givenName || '';
      lastName = contact.familyName || '';
      phoneNumber =
        contact.phoneNumbers && contact.phoneNumbers[0]
          ? contact.phoneNumbers[0].number
          : '';
    } else if (platform === 'ios') {
      // Assuming iOS contact structure
      // iOS contact fields may vary, this is an example structure
      firstName = contact.givenName || '';
      lastName = contact.familyName || '';
      phoneNumber =
        contact.phoneNumbers && contact.phoneNumbers.length > 0
          ? contact.phoneNumbers[0].number
          : '';
    } else {
      throw new Error('Unsupported platform');
    }

    // Normalize phone number by removing non-numeric characters
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    return {
      firstName,
      lastName,
      phone: phoneNumber,
    };
  });
}

export const DashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [phoneContacts, setPhoneContacts] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const {contacts, conversations} = useSelector(state => state.auth);

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

  useEffect(() => {
    if (permissionGranted) {
      Contacts.getAll()
        .then(fetchContacts => {
          setPhoneContacts(simplifyContacts(fetchContacts, Platform.OS));
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

  const handleGenerateUsers = useCallback(async () => {
    await handleGetUserConversations();

    const newContactUsers = [];
    for (const contact of phoneContacts) {
      try {
        const request = await checkContactUser({phone: contact.phone});
        if (request.ok) {
          newContactUsers.push({...request.data?.data, ...contact});
        }
      } catch (error) {
        console.error('Error checking contact user:', error);
      }
    }
    dispatch({type: SET_CONTACTS, payload: newContactUsers});
  }, [dispatch, handleGetUserConversations, phoneContacts]);

  useEffect(() => {
    handleGenerateUsers();
  }, [handleGenerateUsers]);

  const findConversation = contact => {
    const conversation = conversations.find(converse =>
      converse?.participants?.find(part => part?._id === contact?._id),
    );
    return [conversation, contact];
  };

  return (
    <Box safeArea flex={1} pt={'4'}>
      <HStack alignItems={'center'} justifyContent={'space-between'} px={'4'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          Contacts
        </Text>

        <IconButton
          rounded={'full'}
          icon={<Feather name={'plus'} size={20} color={'black'} />}
        />
      </HStack>
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
        {contacts.map((contact, index) => {
          const [conversation, participant] = findConversation(contact);
          return (
            <ContactCard
              key={index}
              showCall={true}
              profile={contact.profile}
              online={true}
              title={
                contact?.firstName && contact?.lastName
                  ? `${contact?.firstName} ${contact?.lastName}`
                  : contact?.phone
              }
              subtitle={'Online'}
              onPress={() =>
                handleStartMessaging({conversation: conversation, participant})
              }
            />
          );
        })}
      </ScrollView>
      <ScrollView mt={'4'} showsVerticalScrollIndicator={false}>
        <Text p={'4'} fontSize={'2xl'} fontWeight={'bold'}>
          Un-Registered Users
        </Text>
        {phoneContacts.map((contact, index) => (
          <ContactCard
            key={index}
            profile={contact?.profile}
            online={false}
            title={
              contact?.firstName && contact?.lastName
                ? `${contact?.firstName} ${contact?.lastName}`
                : contact?.phone
            }
            subtitle={'Click to invite user to infinite'}
            onPress={() => alert('User is not registered in to the app')}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

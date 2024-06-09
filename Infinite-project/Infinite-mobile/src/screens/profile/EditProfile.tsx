import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
  FormControl,
  Input,
} from 'native-base';
import React, {useState} from 'react';
import {MainLayout} from '../../layouts';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {USER_LOADED} from '../../store/constants/auth.constants';
import {saveUserProfile, updateUserData} from '../../api/auth.api';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const routes: any = useRoute();

  const [loading, setLoading] = useState<boolean>(false);

  const {user, isAuthenticated} = useSelector(state => state?.auth);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');

  const [profilePicture, setProfilePicture] = useState(undefined);

  const actionType = routes.params?.actionType;

  const handleSaveProfile = async () => {
    if (firstName.length < 1 || lastName.length < 1) {
      Alert.alert('Warning', 'Please provide a valid firstName and last name');
      return;
    }

    setLoading(true);

    if (profilePicture) {
      console.log(profilePicture);

      const fileName = `${'profile'}.${profilePicture.uri.split('.').pop()}`;
      const formData = new FormData();
      formData.append('profile', {
        uri: profilePicture.uri,
        type: profilePicture.type,
        name: fileName,
      });
      const result = await saveUserProfile(formData);
      console.log(result.data);
    }

    const request = await updateUserData({firstName, lastName});

    if (request.ok) {
      const userData = request.data?.data;
      dispatch({
        type: USER_LOADED,
        payload: {
          user: userData,
        },
      });
      navigation.navigate('HomeScreen');
      setLoading(false);
      return;
    }
    const error: any = request.data?.message
      ? request.data?.message
      : 'Unable to complete your request';
    Alert.alert('Error', error);
    setLoading(false);
  };

  const handleAddProfilePicture = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose an option to set your profile picture',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                saveToPhotos: true,
              },
              response => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.log('Image Picker Error: ', response.errorCode);
                } else {
                  const source = {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                  };
                  setProfilePicture(source);
                }
              },
            );
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
              },
              response => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.log('Image Picker Error: ', response.errorCode);
                } else {
                  const source = {
                    uri: response.assets[0]?.uri,
                    type: response.assets[0]?.type,
                    name: response.assets[0]?.fileName,
                  };
                  setProfilePicture(source);
                }
              },
            );
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <MainLayout>
      <ScrollView flex={'1'} px={'4'} width={'100%'}>
        <Box alignItems={'center'} flex={'1'}>
          {/* profile card  */}
          <Avatar size={'2xl'} source={{uri: profilePicture?.uri}}>
            <Feather name={'user'} size={40} color={'grey'} />
          </Avatar>
          <Button
            onPress={handleAddProfilePicture}
            rounded={'full'}
            startIcon={<Feather name={'camera'} size={16} color={'white'} />}
            mt={'4'}>
            Add Profile Picture
          </Button>
          <VStack width={'100%'} space={'2'}>
            <FormControl>
              <FormControl.Label>First name</FormControl.Label>
              <Input
                size={'lg'}
                py={'3'}
                value={firstName}
                placeholder="First name"
                onChangeText={text => setFirstName(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last name</FormControl.Label>
              <Input
                size={'lg'}
                py={'3'}
                placeholder="Last name"
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            </FormControl>
          </VStack>
        </Box>
        <Button
          isLoading={loading}
          size={'lg'}
          py={'3'}
          mt={'10'}
          onPress={handleSaveProfile}>
          Save
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

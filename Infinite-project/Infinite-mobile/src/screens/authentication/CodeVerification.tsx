import React, {useEffect, useState} from 'react';
import {MainLayout} from '../../layouts';
import {
  FormControl,
  VStack,
  Input,
  Box,
  Text,
  Button,
  IconButton,
  HStack,
  Image,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {AppConstants, Storage} from '../../lib';
import {Alert} from 'react-native';
import {loginUser} from '../../api/auth.api';
import {useRoute} from '@react-navigation/native';
import {LOGIN_USER} from '../../store/constants/auth.constants';
import {useDispatch} from 'react-redux';

export const CodeVerificationScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [passCode, setPassCode] = useState('');
  const phoneNumber = useRoute().params?.phoneNumber;

  const handleSetPassCode = (text: string) => {
    if (text.length > 4) {
      return;
    }

    setPassCode(text);
  };

  const handleCreatePassCode = async () => {
    if (passCode.length < 4) {
      Alert.alert('Warning', 'Please provide a create a valid login code');
      return;
    }

    setLoading(true);

    const request = await loginUser({phone: phoneNumber, password: passCode});
    if (request.ok) {
      const {user, authorization} = request.data?.data;

      dispatch({type: LOGIN_USER, payload: {user, token: authorization.token}});

      saveUserSession({token: authorization.token});
      setLoading(false);
      return;
    }

    const error: any = request.data?.message
      ? request.data?.message
      : 'Unable to complete your request please try again';
    Alert.alert('Error', error);
    setLoading(false);
  };

  const saveUserSession = (session: {token: string}) => {
    Storage.save(
      AppConstants.STORAGE_KEY.USER_SESSION_DATA,
      JSON.stringify(session),
    );
  };

  return (
    <MainLayout headerTitle="Verification">
      <VStack alignItems={'center'} pt={'20'} px={'4'}>
        <Text>Enter Code</Text>
        <Text mt={'4'} textAlign={'center'} px={'4'}>
          Please create your Login Code for your account
        </Text>
        <Input
          variant={'unstyled'}
          textAlign={'center'}
          letterSpacing={20}
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'primary.500'}
          size={'2xl'}
          value={passCode}
          onChangeText={text => handleSetPassCode(text)}
          secureTextEntry={true}
          mt={'4'}
          placeholder="****"
        />
        <Button
          width={'full'}
          rounded={'full'}
          isLoading={loading}
          mt={'4'}
          onPress={handleCreatePassCode}>
          Create Login Code
        </Button>
      </VStack>
    </MainLayout>
  );
};

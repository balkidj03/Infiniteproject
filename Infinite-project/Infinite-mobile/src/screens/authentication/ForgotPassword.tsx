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
import {AppConstants} from '../../lib';
import {Alert} from 'react-native';

export const ForgotPasswordScreen = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendPasswordReset = () => {
    navigation.navigate('CodeVerification');
  };

  return (
    <MainLayout headerTitle="Forgot Password">
      <VStack alignItems={'center'} pt={'20'} px={'4'}>
        <Image
          source={require('../../assets/images/send-email.png')}
          width={120}
          height={120}
          alt={'Image'}
        />
        <Text mt={'6'} fontSize={'lg'} textAlign={'center'} px={'4'}>
          Please enter your email address to receive a verification code
        </Text>
        <FormControl mt={'4'}>
          <FormControl.Label>Email address</FormControl.Label>
          <Input
            size={'lg'}
            py={'3'}
            rounded={'lg'}
            placeholder={'Email address'}
          />
        </FormControl>
        <Button
          isLoading={loading}
          onPress={handleSendPasswordReset}
          width={'full'}
          rounded={'lg'}
          mt={'4'}>
          Verify
        </Button>
      </VStack>
    </MainLayout>
  );
};

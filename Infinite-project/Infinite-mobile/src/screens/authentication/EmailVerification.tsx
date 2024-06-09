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

export const EmailVerificationScreen = ({navigation}) => {
  return (
    <MainLayout headerTitle="Verification">
      <VStack alignItems={'center'} pt={'20'} px={'4'}>
        <Image
          source={require('../../assets/images/email-sent.png')}
          width={120}
          height={120}
          alt={'Image'}
        />
        <Text mt={'4'} fontSize={'lg'} textAlign={'center'} px={'4'}>
          Please enter the verification code we sent to your email address
        </Text>
        <Input
          variant={'unstyled'}
          textAlign={'center'}
          letterSpacing={20}
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'primary.500'}
          size={'2xl'}
          mt={'4'}
          placeholder="****"
        />
        <Button width={'full'} rounded={'full'} mt={'4'}>
          Verify
        </Button>
      </VStack>
    </MainLayout>
  );
};

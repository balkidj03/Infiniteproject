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
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {AppConstants, signInWithFacebook, signInWithGoogle} from '../../lib';
import {Alert} from 'react-native';
import {useAuth} from '../../hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    loading,
    isLogin,
    isRegistration,
    resetCheckUser,
    registerUser,
    loginUser,
    checkIUserExist,
    googleSign,
    facebookSign,
    googleSignLoading,
    facebookSignLoading,
  } = useAuth();

  const isValidEmail = (mail: string) => {
    const pattern = AppConstants.VALIDATORS.EMAIL;
    return pattern.test(mail);
  };

  const isFullNameValid = (name: string): boolean => {
    const trimmedName = name.trim();

    const [first, second] = trimmedName.split(' ');

    return !!second && first.length + second.length >= 6;
  };

  const isPasswordValid = (pass: string) => {
    if (pass.length < 6) {
      return false;
    }

    return true;
  };

  const handleValidateForm = () => {
    if (!isLogin && !isRegistration) {
      return isValidEmail(email) ? true : false;
    }
  };

  const handleRegister = () => {
    if (!isFullNameValid(fullName)) {
      Alert.alert('Validation error', 'Full name cannot be empty or one name');
      return;
    }
    if (!isPasswordValid(password)) {
      Alert.alert(
        'Validation error',
        'You password must be 6 or more character',
      );
      return;
    }

    registerUser({full_name: fullName, email, password});
  };

  const handleLogin = () => {
    if (!isPasswordValid(password)) {
      Alert.alert(
        'Validation error',
        'You password must be 6 or more character',
      );
      return;
    }

    loginUser({email, password});
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <MainLayout>
      <VStack flex={1} px={'5'}>
        <Text
          fontSize={'2xl'}
          fontWeight={'bold'}
          mt={'10'}
          textAlign={'center'}>
          Welcome! Sign up to continue!
        </Text>

        <VStack mt={'4'} space={'3'}>
          <Button
            size={'lg'}
            py={'3'}
            onPress={() => signInWithGoogle(googleSign)}
            isLoading={googleSignLoading}
            colorScheme={'cyan'}
            _text={{color: 'white'}}
            startIcon={
              <AntDesign name={'google'} color={'orange'} size={25} />
            }>
            Log in with Google
          </Button>
          <Button
            size={'lg'}
            py={'3'}
            colorScheme={'cyan'}
            onPress={() => signInWithFacebook(facebookSign)}
            isLoading={facebookSignLoading}
            _text={{color: 'white'}}
            startIcon={
              <Entypo name={'facebook-with-circle'} color={'blue'} size={25} />
            }>
            Log in with Facebook
          </Button>
          <Text textAlign={'center'}>OR</Text>
          <Button
            size={'lg'}
            py={'3'}
            onPress={() => navigation.navigate('SignUpWithEmail')}>
            Sign up with Email
          </Button>
          <Text textAlign={'center'}>
            By signing up you are agreed with our friendly terms and condition.
          </Text>
          <VStack justifyContent={'center'} mt={'10'}>
            <Text textAlign={'center'}>Already have an account?</Text>
            <Button
              onPress={() => navigation.navigate('SignIn')}
              rounded={'full'}
              variant={'ghost'}>
              Sign in
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </MainLayout>
  );
};

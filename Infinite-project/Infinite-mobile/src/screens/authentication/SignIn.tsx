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
  ScrollView,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {AppConstants, signInWithFacebook, signInWithGoogle} from '../../lib';
import {Alert} from 'react-native';
import {useAuth} from '../../hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const SignInScreen = ({navigation}) => {
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
    facebookSign,
    googleSign,
    googleSignLoading,
    facebookSignLoading,
  } = useAuth();

  const handleAuthenticate = () => {
    if (!handleValidateForm()) {
      Alert.alert(
        'Validation error',
        'invalid email please check your email and try again',
      );
      return;
    }

    if (!isRegistration && !isLogin) {
      return checkIUserExist(email);
    }

    if (isLogin) {
      return handleLogin();
    }

    if (isRegistration) {
      return handleRegister();
    }
  };

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
      <ScrollView>
        <VStack flex={1} px={'5'} pb={'4'}>
          <Text
            fontSize={'2xl'}
            fontWeight={'bold'}
            mt={'10'}
            textAlign={'center'}>
            Welcome back! Sign in to continue!
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
              onPress={() => signInWithFacebook(facebookSign)}
              isLoading={facebookSignLoading}
              colorScheme={'cyan'}
              _text={{color: 'white'}}
              startIcon={
                <Entypo
                  name={'facebook-with-circle'}
                  color={'blue'}
                  size={25}
                />
              }>
              Log in with Facebook
            </Button>

            <FormControl>
              <FormControl.Label>Email Address</FormControl.Label>
              <Input
                size={'md'}
                py={'3'}
                autoCapitalize="none"
                rounded={'md'}
                onFocus={() => {
                  resetCheckUser();
                }}
                InputLeftElement={
                  <Box pl={'2'}>
                    <Feather name={'user'} color={'gray'} size={20} />
                  </Box>
                }
                placeholder={'Email Address'}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </FormControl>

            <>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  secureTextEntry={!showPassword}
                  size={'md'}
                  py={'3'}
                  rounded={'md'}
                  InputLeftElement={
                    <Box pl={'2'}>
                      <Feather name={'lock'} color={'gray'} size={20} />
                    </Box>
                  }
                  InputRightElement={
                    <IconButton
                      rounded={'full'}
                      pl={'2'}
                      onPress={() => setShowPassword(!showPassword)}
                      icon={
                        <Feather
                          name={showPassword ? 'eye' : 'eye-off'}
                          color={'gray'}
                          size={20}
                        />
                      }
                    />
                  }
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder={'Password'}
                />
              </FormControl>
              <HStack justifyContent={'center'}>
                <Button
                  onPress={handleForgotPassword}
                  rounded={'full'}
                  variant={'ghost'}>
                  Forgot Password?
                </Button>
              </HStack>
            </>
          </VStack>
          <Box flex={1} justifyContent={'flex-end'}>
            <Button isLoading={loading} onPress={handleLogin} rounded={'full'}>
              Login
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </MainLayout>
  );
};

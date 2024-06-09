import React, {useState} from 'react';
import {MainLayout} from '../../layouts';
import {
  FormControl,
  VStack,
  Input,
  Box,
  Text,
  Button,
  IconButton,
  ScrollView,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {AppConstants} from '../../lib';
import {Alert} from 'react-native';
import {useAuth} from '../../hooks';

export const SingUpWithEmailScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {loading, isLogin, isRegistration, resetCheckUser, registerUser} =
    useAuth();

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
    if (!handleValidateForm()) {
      Alert.alert(
        'Validation error',
        'invalid email please check your email and try again',
      );
    }
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

    const [firstName, lastName] = fullName.split(' ');

    registerUser({firstName, lastName, email, password});
  };

  return (
    <MainLayout>
      <ScrollView>
        <VStack flex={1} px={'5'} pb={'2'}>
          <Text fontSize={'2xl'} fontWeight={'bold'} mt={'10'}>
            Enter your details
          </Text>

          <VStack mt={'4'} space={'3'}>
            <FormControl>
              <FormControl.Label>Full name</FormControl.Label>
              <Input
                size={'md'}
                py={'3'}
                rounded={'md'}
                InputLeftElement={
                  <Box pl={'2'}>
                    <Feather name={'user'} color={'gray'} size={20} />
                  </Box>
                }
                placeholder={'Full name'}
                value={fullName}
                onChangeText={text => setFullName(text)}
              />
            </FormControl>
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
                    <Feather name={'mail'} color={'gray'} size={20} />
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
                  placeholder={'Password'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </FormControl>
            </>
          </VStack>
          <Box mt={'20px'}>
            <Button
              isLoading={loading}
              onPress={handleRegister}
              rounded={'full'}>
              Register
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </MainLayout>
  );
};

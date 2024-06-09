import {ImageBackground, View} from 'react-native';
import React from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import {responsiveHeight, signInWithGoogle} from '../../lib';
import Icons from 'react-native-vector-icons/Fontisto';
import {Platform} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {CommonActions} from '@react-navigation/native';

export const GetStarted = ({navigation, route}) => {
  const handleStartWithEmailOrPhone = () => {
    navigation.navigate('Auth');
  };

  const handleLoginWithGoogle = () => {
    signInWithGoogle(handleLoginSuccess);
  };

  const handleLoginSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      <Box flex={'1'} safeArea px={4}>
        <Box mt={'100px'}>
          <Heading textAlign={'center'}>Welcome! Sign up to continue!</Heading>
        </Box>
        <VStack space={3} flex={1} mt={'100px'}>
          <VStack px={'4'} space={4} width={'100%'}>
            <Button
              onPress={handleLoginWithGoogle}
              bgColor={'gray.200'}
              _text={{color: 'black'}}
              leftIcon={<Icons name={'google'} size={18} color={'#4285F4'} />}>
              Sign Up with Google
            </Button>
            <Button
              leftIcon={<Icons name={'facebook'} size={18} color={'#3b5998'} />}
              bgColor={'gray.200'}
              _text={{color: 'black'}}>
              Sign Up with Facebook
            </Button>

            <HStack
              alignItems={'center'}
              width={'100%'}
              space={4}
              justifyContent={'center'}>
              <Divider width={'33%'} />
              <Text>Sign in with</Text>
              <Divider width={'33%'} />
            </HStack>

            <Button
              onPress={handleStartWithEmailOrPhone}
              rounded={'full'}
              mb={'2'}>
              Start with Email or Phone
            </Button>
            <Text textAlign={'center'}>
              By signing up you are agreed with our friendly terms and
              condition.
            </Text>
          </VStack>
        </VStack>
      </Box>
    </View>
  );
};

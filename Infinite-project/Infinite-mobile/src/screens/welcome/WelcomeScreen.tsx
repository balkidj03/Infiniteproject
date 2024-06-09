import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Button, useTheme, Box, Text, Image, VStack} from 'native-base';

export const WelcomeScreen = ({navigation}: any) => {
  return (
    <Box flex={1} px={'4'}>
      <VStack
        flex={1}
        alignItems={'center'}
        justifyContent={'flex-end'}
        pb={10}>
        <Image source={require('../../assets/images/Illustration.png')} />
        <Text
          textAlign={'center'}
          fontSize={'xl'}
          fontWeight={'bold'}
          my={'10'}>
          Connect easily with your family and friends over countries
        </Text>
        <Text mb={'3'} mt={'6'}>
          Terms & Privacy Policy
        </Text>
        <Button
          py={'3'}
          size={'lg'}
          width={'full'}
          rounded={'full'}
          onPress={() => navigation.navigate('Auth')}>
          Start Messaging
        </Button>
      </VStack>
    </Box>
  );
};

import React from 'react';
import {Box, Text, Image, Spinner} from 'native-base';

export const SplashScreen = () => {
  return (
    <Box bgColor={'primary.500'} safeArea flex={1} alignItems={'center'}>
      <Box flex={1} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={require('../../assets/images/infinite-logo.png')}
          alt={'logo'}
          width={150}
          height={150}
        />
        <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'} mt={'10px'}>
          INFINITE
        </Text>
      </Box>
      <Box pb={2}>
        <Spinner color={'white'} />
      </Box>
    </Box>
  );
};

import {useNavigation} from '@react-navigation/native';
import {Box, HStack, IconButton, Text} from 'native-base';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveWidth} from '../lib';

interface MainLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  hideBackButton?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  headerTitle,
  hideBackButton,
}) => {
  const {goBack} = useNavigation();

  const handleGoBack = () => goBack();
  return (
    <Box flex={1} safeArea bgColor={'white'}>
      <HStack alignItems={'center'} px={'4'} py={'3'}>
        {!hideBackButton && (
          <IconButton
            rounded={'full'}
            onPress={handleGoBack}
            icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
          />
        )}
        <HStack
          zIndex={-1}
          left={responsiveWidth(15)}
          justifyContent={'center'}
          width={'100%'}
          position={'absolute'}>
          <Text fontWeight={'semibold'} fontSize={'md'}>
            {headerTitle}
          </Text>
        </HStack>
      </HStack>
      {children}
    </Box>
  );
};

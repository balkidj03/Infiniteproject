import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Card,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
  FormControl,
  Input,
} from 'native-base';
import React from 'react';
import {MainLayout} from '../../layouts';
import Feather from 'react-native-vector-icons/Feather';

export const SaveCourseScreen = () => {
  const navigation = useNavigation();

  return (
    <MainLayout>
      <ScrollView flex={'1'} px={'4'} width={'100%'}>
        <Box alignItems={'center'} flex={'1'}>
          {/* profile card  */}
          <Avatar size={'2xl'}>YB</Avatar>
          <Button
            startIcon={<Feather name={'camera'} size={20} color={'white'} />}
            mt={'4'}>
            Change
          </Button>
          <VStack width={'100%'} space={'2'}>
            <FormControl>
              <FormControl.Label>First name</FormControl.Label>
              <Input size={'lg'} py={'3'} placeholder="First name" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last name</FormControl.Label>
              <Input size={'lg'} py={'3'} placeholder="First name" />
            </FormControl>
          </VStack>
        </Box>
        <Button size={'lg'} py={'3'} mt={'10'}>
          Update
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

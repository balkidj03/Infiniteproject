import React from 'react';
import {Box, HStack, Text, IconButton, Pressable} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export const SearchButton = ({placeholder}) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('SearchCourse')}>
      <HStack
        width={'full'}
        alignItems={'center'}
        borderWidth={1}
        padding={'2'}
        rounded={'lg'}
        justifyContent={'space-between'}>
        <Text>{placeholder}</Text>
        <IconButton icon={<Feather name={'search'} size={20} />} />
      </HStack>
    </Pressable>
  );
};

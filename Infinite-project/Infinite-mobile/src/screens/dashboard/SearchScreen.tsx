import {Box, HStack, IconButton, Input, ScrollView, Text} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

export const SearchScreen = () => {
  return (
    <ScrollView flex={1}>
      <Box flex={1} px={4} mt={'4'}>
        <Input
          size={'lg'}
          py={'3'}
          placeholder="Search for courses"
          InputRightElement={
            <Box pr={'4'}>
              <Feather name={'search'} size={20} color={'black'} />
            </Box>
          }
        />
        <HStack alignItems={'center'} mt={'2'}>
          <Text flex={1}>Your search result</Text>
          <IconButton
            icon={<Feather name={'filter'} size={20} color={'black'} />}
            rounded={'full'}
          />
        </HStack>
      </Box>
    </ScrollView>
  );
};

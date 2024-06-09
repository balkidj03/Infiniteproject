import {Box, Text, Image} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export const SubjectCategoryCard = ({subject, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        height={'120px'}
        width={'200px'}
        rounded={'10px'}
        bgColor={'green.500'}
        alignItems={'center'}
        overflow={'hidden'}
        justifyContent={'flex-end'}>
        <Image
          source={require('../../assets/images/barawe-logo.png')}
          alt={'category'}
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          resizeMode={'stretch'}
          zIndex={-1}
        />
        <Text mb={'8px'} fontWeight={'bold'} color={'black'}>
          {subject}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

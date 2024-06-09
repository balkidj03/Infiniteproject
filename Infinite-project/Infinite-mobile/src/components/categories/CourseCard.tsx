import {Box, Text, Image, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const images: {[key: string]: any} = {
  img3: require('../../assets/images/img3.png'),
  img4: require('../../assets/images/img4.png'),
  img5: require('../../assets/images/img5.png'),
  img6: require('../../assets/images/img6.png'),
};

export const CourseCard = ({title, image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: '48%', margin: 5}}>
      <VStack bgColor={'white'} height={'140px'} width={'100%'}>
        <Box
          height={'120px'}
          rounded={'10px'}
          bgColor={'green.500'}
          alignItems={'center'}
          overflow={'hidden'}
          justifyContent={'flex-end'}>
          <Image
            source={{uri: image}}
            alt={'category'}
            position={'absolute'}
            width={'100%'}
            height={'100%'}
            resizeMode={'stretch'}
            zIndex={-1}
          />
        </Box>
        <Text>{title}</Text>
      </VStack>
    </TouchableOpacity>
  );
};

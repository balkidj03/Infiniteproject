import React, {useCallback, useState} from 'react';
import {Box, Text, VStack, HStack, IconButton, Pressable} from 'native-base';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe';

export const CourseDetailScreen = ({navigation, route}) => {
  const course = route.params?.course;
  const [currentlyPlaying, setCurrentlyPlaying] = useState(course.videos[0]);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      
    }
  }, []);

  return (
    <Box flex={1}>
      <HStack position={'absolute'} zIndex={100} mt={'3'} px={'4'}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<AntDesign name={'arrowleft'} size={20} />}
          rounded={'full'}
        />
      </HStack>

      <Box flex={1} bgColor={'black'}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={currentlyPlaying?.videoId}
          onChangeState={onStateChange}
        />
      </Box>
      <Box flex={2}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: 'white'}}>
          <VStack my={'3'} px={'4'} space={'2'}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              {currentlyPlaying?.title}
            </Text>
          </VStack>
          {course?.videos.map((video: {[key: string]: any}, index: number) => (
            <Pressable onPress={() => setCurrentlyPlaying(video)}>
              {({isPressed}) => (
                <HStack
                  px={'4'}
                  py={'3'}
                  space={'3'}
                  mt={'3'}
                  alignItems={'center'}
                  shadow={1}
                  bgColor={isPressed ? 'grey.300' : 'white'}>
                  <Text
                    fontSize={'2xl'}
                    color={'primary.500'}
                    fontWeight={'bold'}>
                    {index + 1}
                  </Text>
                  <VStack flex={1}>
                    <Text fontWeight={'bold'}>{video.title}</Text>
                    <Text numberOfLines={1}>{video.channelTitle}</Text>
                  </VStack>
                  <AntDesign name={'play'} size={40} color={'#3366FF'} />
                </HStack>
              )}
            </Pressable>
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

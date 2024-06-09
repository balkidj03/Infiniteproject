import React, {useEffect, useState, useCallback} from 'react';
import {Box, Text, IconButton, Input, FlatList} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {CourseCard} from '../../components';

export const SearchCourseScreen = ({navigation}) => {
  const {courses} = useSelector(state => state.auth);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filter, setFilter] = useState('');

  const handleSearchCourse = useCallback(() => {
    if (filter.length < 1) {
      setFilteredCourses([]);
      return;
    }
    setFilteredCourses(courses.filter(course => course.title.includes(filter)));
  }, [courses, filter]);

  useEffect(() => {
    handleSearchCourse();
  }, [filter, handleSearchCourse]);

  return (
    <Box safeArea flex={1} px={'4'} pt={'2'}>
      <Input
        mt={'15px'}
        py={'3'}
        size={'lg'}
        autoFocus={true}
        value={filter}
        onChangeText={text => setFilter(text)}
        placeholder={'Search for courses'}
        InputRightElement={
          <IconButton
            rounded={'full'}
            icon={<Feather name={'search'} color={'black'} size={20} />}
          />
        }
      />

      {filteredCourses.length > 0 ? (
        <Box flex={1}>
          <FlatList
            data={filteredCourses}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <CourseCard
                title={item.title}
                image={item.thumbnail}
                onPress={() =>
                  navigation.navigate('CourseDetail', {course: item})
                }
              />
            )}
          />
        </Box>
      ) : (
        <Box flex={1} alignItems={'center'} pt={'10'}>
          <Text>
            {filter.length > 0
              ? `Course with this filter ${filter} not found`
              : 'Search for courses'}
          </Text>
        </Box>
      )}
    </Box>
  );
};

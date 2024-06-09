import React from 'react';
import {MainLayout} from '../../layouts';
import {Box, FlatList, Text} from 'native-base';
import {CourseCard, SearchButton} from '../../components';
import {useSelector} from 'react-redux';

export const CategoriesItemListScreen = ({navigation, route}) => {
  const courses = route.params?.courses;

  return (
    <MainLayout headerTitle="Most Watch">
      <Box px={'4'}>
        <SearchButton placeholder={'Search for courses..'} />
        <Box mt={'4'} />
        <FlatList
          data={courses}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
    </MainLayout>
  );
};

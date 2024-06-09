import React, {useCallback, useEffect, useState} from 'react';
import {MainLayout} from '../../layouts';
import {Box, FlatList, Image, Text} from 'native-base';
import {useSelector} from 'react-redux';
import {SubjectCategoryCard} from '../../components';
import {TouchableOpacity} from 'react-native';

export const CategoriesListScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  const {courses} = useSelector(state => state.auth);

  const handleGroupByCategory = useCallback(() => {
    const groupedCategories = courses.reduce((acc, course) => {
      const category = course.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {});

    setCategories(Object.entries(groupedCategories));
  }, [courses]);

  useEffect(() => {
    handleGroupByCategory();
  }, [handleGroupByCategory]);
  return (
    <MainLayout headerTitle="Categories">
      <Box px={'4'} flex={1}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false} // Adjust this based on your layout needs
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoriesItemList', {courses: item[1]})
              }>
              <Box
                height={'200px'}
                width={'100%'}
                mt={'4'}
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
                  {item[0]}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </MainLayout>
  );
};

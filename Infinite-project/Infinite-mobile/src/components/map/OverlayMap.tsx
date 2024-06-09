/* eslint-disable react/self-closing-comp */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Actionsheet, IconButton, Input, VStack, useTheme} from 'native-base';
import {responsiveHeight} from '../../lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Box, Text, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const DotMarker = ({coordinate, color, size, title}: any) => (
  <Marker title={title} coordinate={coordinate} anchor={{x: 0.5, y: 0.5}}>
    <View
      style={[
        styles.dot,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  </Marker>
);

export const OverlayMap = ({onClose}: any) => {
  const {colors} = useTheme();
  const [selectedLocation, setSelectedLocation] = useState();
  const [searchHeight, setSearchHeight] = useState<number>(100);
  const {navigate} = useNavigation();
  const [searchModal, setSearchModal] = useState<boolean>(true);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse').then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setRegion({
              ...region,
              latitude,
              longitude,
            });
          },
          error => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );

        const watchId = Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setRegion({
              ...region,
              latitude,
              longitude,
            });
          },
          error => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );

        return () => {
          Geolocation.clearWatch(watchId);
        };
      }
    });
  }, [region]);

  return (
    <View style={styles.container}>
      <Box safeArea left={4} top={2} position={'absolute'} zIndex={100}>
        <IconButton
          onPress={onClose}
          rounded={'full'}
          size={'lg'}
          variant={'solid'}
          icon={<AntDesign name={'close'} color={'white'} size={20} />}
        />
      </Box>
      <MapView
        onPress={() => setSearchHeight(100)}
        style={styles.map}
        region={region}>
        <DotMarker
          coordinate={region}
          title={'Current Location'}
          color={colors.primary[500]}
          size={responsiveHeight(25)}
        />

        <Marker draggable coordinate={region} title="Use this location" />
      </MapView>
      <Actionsheet disableOverlay={true} isOpen={searchModal}>
        <Actionsheet.Content>
          <Box width={'full'} height={responsiveHeight(searchHeight)}>
            <Text textAlign={'center'} fontWeight={'semibold'} fontSize={'md'}>
              Add a delivery address
            </Text>
            <Input
              onFocus={() => setSearchHeight(250)}
              isFocused={searchHeight === 100}
              mt={'4'}
              InputLeftElement={
                <Box pl={'3'}>
                  <AntDesign name={'search1'} size={20} color={'black'} />
                </Box>
              }
              size={'lg'}
              rounded={'full'}
              placeholder={'Search for your address'}
            />
            {searchHeight > 100 && (
              <VStack flex={1} justifyContent={'flex-end'}>
                <Button
                  onPress={() => {
                    setSearchModal(false);
                    navigate('AddressScreen');
                  }}
                  rounded={'full'}>
                  Address Detail
                </Button>
              </VStack>
            )}
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  dot: {
    borderWidth: 4,
    borderColor: 'white',
  },
  innerDot: {
    width: '70%',
    height: '70%',
    borderRadius: 50,
    backgroundColor: 'white',
    margin: '15%',
  },
});

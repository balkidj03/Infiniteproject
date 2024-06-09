import React, {useState} from 'react';
import {MainLayout} from '../../layouts';
import {ScrollView, Text, Input, Button, Box} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Alert} from 'react-native';

export const AuthScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    // Check if the phone number length is between 10 and 14 digits
    if (phoneNumber.length <= 9 || phoneNumber.length >= 15) {
      Alert.alert('Please provide a valid phone number');
      return;
    }

    // Regular expression to validate phone number (simple validation for digits only)
    const phoneRegex = /^\d+$/;

    // Validate phone number
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Please provide a valid phone number');
      return;
    }

    // Navigate to the CodeVerification screen if validation passes
    navigation.navigate('CodeVerification', {phoneNumber});
  };

  return (
    <MainLayout>
      <ScrollView px={'4'} flex={1} pt={'20'}>
        <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
          Enter your phone number
        </Text>
        <Text textAlign={'center'}>
          Please confirm your country code and enter your phone number
        </Text>
        <Input
          mt={'10'}
          placeholder={'Phone number'}
          keyboardType="decimal-pad"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          py={'3'}
          size={'lg'}
          rounded={'full'}
          InputLeftElement={
            <Box pl={'3'}>
              <Feather name={'phone'} size={20} color={'black'} />
            </Box>
          }
        />
        <Button
          py={'3'}
          size={'lg'}
          rounded={'full'}
          mt={'5'}
          onPress={handleContinue}>
          Continue
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

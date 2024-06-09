import React, {Component} from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Box} from 'native-base';

// Function to generate a unique alphanumeric string
function generateUniqueAlphanumeric(length) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uniqueString += chars[randomIndex];
  }
  return uniqueString;
}

export const CallScreen = () => {
  const navigation = useNavigation();
  const callData = useRoute().params?.callData;

  const callConfig =
    callData?.type === 'video'
      ? ONE_ON_ONE_VIDEO_CALL_CONFIG
      : ONE_ON_ONE_VOICE_CALL_CONFIG;

  return (
    <Box flex={1}>
      <ZegoUIKitPrebuiltCall
        appID={'127789387'}
        appSign={
          'd89ad90ad63d3889bdd8282675ccba3d1b40f500f02a4d0abbbbf9a4e5839f29'
        }
        userID={callData?.userId} // userID can be something like a phone number or the user id on your own user system.
        userName={callData?.name}
        callID={generateUniqueAlphanumeric(14)} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...callConfig,
          onOnlySelfInRoom: () => {
            navigation.navigate('HomeScreen');
          },
          onHangUp: () => {
            navigation.navigate('HomeScreen');
          },
        }}
      />
    </Box>
  );
};

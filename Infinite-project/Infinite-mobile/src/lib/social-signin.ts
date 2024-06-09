import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

export const signInWithGoogle = async (callback: any) => {
  GoogleSignin.configure({
    androidClientId:
      '108028887260-18b883ir6ha3i43q8cokkdorgo940k38.apps.googleusercontent.com',
    iosClientId:
      '420811663437-5hksb1h4ukba6lnr8tq1fo9du04vl29l.apps.googleusercontent.com',
  });
  GoogleSignin.hasPlayServices()
    .then(hasPlayService => {
      if (hasPlayService) {
        GoogleSignin.signIn()
          .then(userInfo => {
            // console.log(JSON.stringify(userInfo));
            const payload = {
              firstName: userInfo.user.givenName,
              lastName: userInfo.user.familyName,
              email: userInfo.user.email,
              id: userInfo.user.id,
            };
            callback(payload);
          })
          .catch(e => {
            Alert.alert('Google Error', 'Unable to complete your request');
            
          });
      }
    })
    .catch(e => {
      Alert.alert('Google Error', 'Unable to complete your request');
      console.log('ERROR IS: ' + JSON.stringify(e));
    });
};

export const signInWithFacebook = async callback => {
  
};

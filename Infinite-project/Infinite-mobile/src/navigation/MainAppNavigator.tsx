import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GetStarted,
  AuthScreen,
  WelcomeScreen,
  EmailVerificationScreen,
  CodeVerificationScreen,
  ForgotPasswordScreen,
  SignInScreen,
  SignUpScreen,
  SingUpWithEmailScreen,
  EditProfileScreen,
  CategoriesItemListScreen,
  CategoriesListScreen,
  CourseDetailScreen,
  PlayerScreen,
  SearchCourseScreen,
  MessagingScreen,
  CallScreen,
} from '../screens';
import {BottomTabNavigator} from './BottomTabNavigator';
import {useSelector} from 'react-redux';

interface IMainAppNavigator {
  addressAdded: boolean;
  authenticated: boolean;
}

const Stack = createNativeStackNavigator();

const AuthAppNavigator = () => (
  <>
    <Stack.Screen
      name={'Welcome'}
      component={WelcomeScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'EditProfile'}
      component={EditProfileScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'GetStarted'}
      component={GetStarted}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'Auth'}
      component={AuthScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'SignIn'}
      component={SignInScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'SignUp'}
      component={SignUpScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'SignUpWithEmail'}
      component={SingUpWithEmailScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'EmailVerification'}
      component={EmailVerificationScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'CodeVerification'}
      component={CodeVerificationScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={'ForgotPassword'}
      component={ForgotPasswordScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
  </>
);

const DashboardNavigator = () => {
  const {user} = useSelector(state => state.auth);
  return (
    <>
      {!user.firstName && !user.lastName && (
        <Stack.Screen
          name={'UpdateProfile'}
          component={EditProfileScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name={'HomeScreen'}
        component={BottomTabNavigator}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'EditProfile'}
        component={EditProfileScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'MessagingScreen'}
        component={MessagingScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CategoriesList'}
        component={CategoriesListScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CourseDetail'}
        component={CourseDetailScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'CallScreen'}
        component={CallScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Player'}
        component={PlayerScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SearchCourse'}
        component={SearchCourseScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
    </>
  );
};

export const MainAppNavigator: FC<IMainAppNavigator> = ({authenticated}) => (
  <Stack.Navigator>
    {!authenticated ? AuthAppNavigator() : DashboardNavigator()}
  </Stack.Navigator>
);

import {useDispatch, useSelector} from 'react-redux';

import {useState} from 'react';
import {Alert} from 'react-native';

import {AppConstants, Storage} from '../lib';
import {LOGIN_USER} from '../store/constants/auth.constants';
import * as authApi from '../api/auth.api';

export const useAuth = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [googleSignLoading, setGoogleSignLoading] = useState<boolean>(false);
  const [facebookSignLoading, setFacebookSignLoading] =
    useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const registerUser = async (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    const request: {[key: string]: any} = await authApi.registerUser(payload);
    if (request.ok) {
      const {user, authorization} = request.data.data;

      

      dispatch({type: LOGIN_USER, payload: {user, token: authorization.token}});

      saveUserSession({token: authorization.token});
      setLoading(false);
      return;
    }

    if (request.data?.message) {
      Alert.alert('Register Error', request.data?.message);
    } else {
      Alert.alert('Register Error', 'Unable to register please try again');
    }
    setLoading(false);
  };

  const googleSign = async (payload: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  }) => {
    setGoogleSignLoading(true);

    const request: {[key: string]: any} = await authApi.googleSign(payload);
    if (request.ok) {
      const {user, authorization} = request.data.data;

      dispatch({type: LOGIN_USER, payload: {user, token: authorization.token}});

      saveUserSession({token: authorization.token});
      setGoogleSignLoading(false);
      return;
    }

    if (request.data?.message) {
      Alert.alert('Register Error', request.data?.message);
    } else {
      Alert.alert('Register Error', 'Unable to register please try again');
    }
    setGoogleSignLoading(false);
  };

  const facebookSign = async (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    const request: {[key: string]: any} = await authApi.facebookSign(payload);
    if (request.ok) {
      const {user, authorization} = request.data.data;

     

      dispatch({type: LOGIN_USER, payload: {user, token: authorization.token}});

      saveUserSession({token: authorization.token});
      setLoading(false);
      return;
    }

    if (request.data?.message) {
      Alert.alert('Register Error', request.data?.message);
    } else {
      Alert.alert('Register Error', 'Unable to register please try again');
    }
    setLoading(false);
  };

  const checkIUserExist = async (email: string) => {
    setLoading(true);

    const request = await {};
    if (request.ok) {
      if (request.data?.status) {
        setIsLogin(true);
      } else {
        setIsRegistration(true);
      }
      setLoading(false);
      return;
    }

    Alert.alert('Network error', 'Network error please try again');
    setLoading(false);
  };

  const resetCheckUser = () => {
    setIsLogin(false);
    setIsRegistration(false);
  };

  const loginUser = async (payload: {email: string; password: string}) => {
    setLoading(true);

    const request: {[key: string]: any} = await authApi.loginUser(payload);
    if (request.ok) {
      const {user, authorization} = request.data.data;

      saveUserSession({token: authorization.token});
      dispatch({type: LOGIN_USER, payload: {user, token: authorization.token}});

      setLoading(false);

      return;
    }

    Alert.alert(
      'Login Error',
      request.data?.message ? request.data.message : 'Invalid credentials',
    );
    setLoading(false);
  };

  const saveUserSession = (session: {token: string}) => {
    Storage.save(
      AppConstants.STORAGE_KEY.USER_SESSION_DATA,
      JSON.stringify(session),
    );
  };

  return {
    loginUser,
    registerUser,
    loading,
    isLogin,
    isRegistration,
    checkIUserExist,
    resetCheckUser,
    googleSign,
    facebookSign,
    googleSignLoading,
    facebookSignLoading,
  };
};

import {http} from './config';
import {store} from '../store';

export const loginUser = (payload: any) =>
  http.post('/api/v1/auth/login', payload);

export const getUserData = (token: string) => {
  return http.get(
    '/api/v1/auth/user',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateUserData = async payload => {
  const {token} = store.getState().auth;

  return http.post('/api/v1/auth/user', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveUserProfile = async (payload: any) => {
  const {token} = store.getState().auth;

  return http.post('/api/v1/auth/user/profile', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserConversations = async () => {
  const {token} = store.getState().auth;

  return http.get(
    '/api/v1/auth/conversations',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getUserConversation = async (conversationId: string) => {
  const {token} = store.getState().auth;

  return http.get(
    `/api/v1/auth/conversations/${conversationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const checkContactUser = async (payload: {phone: string}) => {
  const {token} = store.getState().auth;

  return http.post('/api/v1/auth/check-user', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessage = async (payload: {[key: string]: any}) => {
  const {token} = store.getState().auth;

  return http.post('/api/v1/auth/conversations/sendMessage', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

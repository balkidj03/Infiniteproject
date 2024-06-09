import {useDispatch} from 'react-redux';
import {
  AUTH_ERROR,
  SET_COURSES,
  USER_LOADED,
  USER_LOADING,
} from '../store/constants/auth.constants';
import {AppConstants, Storage} from '../lib';
import {useCallback} from 'react';
import {getUserData} from '../api/auth.api';
import {getCourses} from '../api/courses.api';

export const useUserSession = () => {
  const dispatch = useDispatch();

  const loadUserSession = useCallback(async () => {
    dispatch({type: USER_LOADING});

    const session = await Storage.get(
      AppConstants.STORAGE_KEY.USER_SESSION_DATA,
    );
    if (!session) {
      dispatch({type: AUTH_ERROR});
      return;
    }
    const parseSession = JSON.parse(session);
    const request: {[key: string]: any} = await getUserData(parseSession.token);
    if (request.ok) {
      const user = request.data.data;
      dispatch({type: USER_LOADED, payload: {user, token: parseSession.token}});
    }
  }, [dispatch]);

  return {loadUserSession};
};

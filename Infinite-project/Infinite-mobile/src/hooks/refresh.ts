import {useDispatch} from 'react-redux';
import {useEffect, useCallback, useState} from 'react';
import {getUserConversation, getUserConversations} from '../api/auth.api';
import {SET_CONVERSATIONS} from '../store/constants/auth.constants';

export const useRefresh = () => {
  const dispatch = useDispatch();
};

export const useAutoUpdateConversations = () => {
  const dispatch = useDispatch();

  const updateConversations = useCallback(async () => {
    const request = await getUserConversations();

    if (request.ok) {
      dispatch({type: SET_CONVERSATIONS, payload: request.data?.data});
    }
  }, [dispatch]);

  useEffect(() => {
    updateConversations(); // Initial call
    const intervalId = setInterval(updateConversations, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [updateConversations]);
};

export const useAutoUpdateMessages = (conversationId, setConversation) => {
  const updateMessages = useCallback(async () => {
    if (conversationId) {
      const request = await getUserConversation(conversationId);
      if (request.ok) {
        setConversation(request.data?.data);
      }
    }
  }, [conversationId, setConversation]);

  useEffect(() => {
    updateMessages(); // Initial call
    const intervalId = setInterval(updateMessages, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [updateMessages]);
};

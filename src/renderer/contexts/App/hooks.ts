import { useCallback } from 'react';
import { useAppContext } from '_renderer/contexts/App/AppContext';

export const useCurrentUser = () => {
  const { state } = useAppContext();
  return state.currentUser;
};

export const useSetCurrentUser = () => {
  const { dispatch } = useAppContext();
  const setCurrentUser = useCallback((username: string | null) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: { currentUser: username } });
  }, [dispatch]);
  return setCurrentUser;
};
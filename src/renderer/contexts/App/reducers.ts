import { AppAction, AppState } from './types';

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload.currentUser };
    default:
      return state;
  }
};
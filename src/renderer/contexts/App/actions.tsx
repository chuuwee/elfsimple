export type SetCurrentUserActionPayload = {
  currentUser: string | null;
};

export type SetCurrentUserAction = {
  type: 'SET_CURRENT_USER';
  payload: SetCurrentUserActionPayload;
};

export const setCurrentUser = (username: string): SetCurrentUserAction => {
  return { type: 'SET_CURRENT_USER', payload: { currentUser: username } };
};
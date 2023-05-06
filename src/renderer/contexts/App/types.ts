import { SetCurrentUserAction } from "./actions";

export interface AppState {
  currentUser: string | null;
}

export const initialState: AppState = {
  currentUser: null
};

export const getInitialState = (currentUser: string | undefined): AppState => ({
  currentUser: currentUser ?? null
});

export type AppAction = SetCurrentUserAction;
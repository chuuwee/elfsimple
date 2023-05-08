import React, { useReducer, createContext, useContext } from 'react';
import { appReducer } from '_renderer/contexts/App/reducers';
import { initialState, AppState, AppAction } from '_renderer/contexts/App/types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
});

interface AppProviderProps {
  initialState?: AppState;
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ initialState: initialState_, children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState_ ?? initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
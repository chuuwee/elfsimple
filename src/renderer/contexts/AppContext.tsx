import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Subscriber, useSubscriptionChannel } from '_/renderer/subscriptions';
import { Spinner } from '@blueprintjs/core';
import { useIsAppContextLoading } from './hooks';

export interface AppState {
  currentUser: string | null;
  logFilePath: string | null;
}

interface AppContextType {
  state: AppState;
  subscribeOnLog: Subscriber<string>;
  setCurrentUser: (username: string | null) => void;
  setLogFilePath: (filePath: string | null) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType | null => {
  return useContext(AppContext);
};

/**
 * `null` implies loading. 
 */
export const useAppContextOrFail = (): AppContextType => {
  const context = useAppContext();
  if (context == null) {
    throw new Error('App context uninitialized - loading.');
  }
  return context;
};

export const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const isAppContextLoading = useIsAppContextLoading();
  if (isAppContextLoading) {
    return <Spinner />;
  }
  return <>{children}</>;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [logFilePath, setLogFilePath] = useState<string | null>(null);

  const { broadcast: onLog, subscribe: subscribeOnLog } = useSubscriptionChannel<string>();

  useEffect(() => {
    (async () => {
      const logFilePath = await window.api.invoke('getLogPath');
      if (logFilePath != null) {
        setLogFilePath(logFilePath);
      }
      const currentUser = await window.api.invoke('getCurrentUser');
      if (currentUser != null) {
        setCurrentUser(currentUser);
      }
      setIsLoading(false);
    })();
  }, []);

  const state: AppState | null = useMemo(() => ({
    currentUser,
    logFilePath,
  }), [currentUser, logFilePath]);

  const context = useMemo(() => {
    if (isLoading) {
      return null;
    }
    return {
      state,
      subscribeOnLog,
      setCurrentUser,
      setLogFilePath,
    };
  }, [isLoading, state, subscribeOnLog]);

  return (
    <AppContext.Provider value={context}>
      <LoadingWrapper>
        {children}
      </LoadingWrapper>
    </AppContext.Provider>
  );
};
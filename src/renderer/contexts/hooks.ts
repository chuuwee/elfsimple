import { useAppContext, useAppContextOrFail } from "./AppContext"

export const useIsAppContextLoading = (): boolean => {
  const appContext = useAppContext();
  return appContext == null;
};

export const useCurrentUser = (): string | null => {
  const { state: { currentUser } } = useAppContextOrFail();
  return currentUser;
}

export const useSetCurrentUser = (): (username: string | null) => void => {
  const { setCurrentUser } = useAppContextOrFail();
  return setCurrentUser;
}

export const useLogFilePath = (): string | null => {
  const { state: { logFilePath } } = useAppContextOrFail();
  return logFilePath;
}

export const useSetLogFilePath = (): (username: string | null) => void => {
  const { setLogFilePath } = useAppContextOrFail();
  return setLogFilePath;
}
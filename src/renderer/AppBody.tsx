import React, { useCallback, useEffect, useState } from 'react';
import { H4 } from '@blueprintjs/core';
import { IpcRendererEvent } from 'electron';
import { FilePicker } from '_renderer/FilePicker';
import { useLogFilePath, useSetLogFilePath } from '_renderer/contexts/hooks';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 15px;
`;

export const AppBody: React.FC = () => {
  const [messages, setMessages] = useState<string[]>(() => []);
  const logFilePath = useLogFilePath();
  const setLogFilePath = useSetLogFilePath();

  useEffect(() => {
    //window.api.invoke('subscribeToMessages');
    const onMessage = (_: IpcRendererEvent, message: string) => {
      setMessages((m) => ([...m, message]));
    };
    window.api.on('message', onMessage);
    return () => {
      window.api.off('message', onMessage);
    };
  }, []);

  const onFileSelect = useCallback(async (logFilePath: string) => {
    setLogFilePath(logFilePath);
    await window.api.invoke('setLogPath', logFilePath);
  }, [])

  return (
    <AppContainer>
      <FilePicker selectedFile={logFilePath} onFileSelect={onFileSelect} />
      {messages.map(str => <H4>{str}</H4>)}
    </AppContainer>
  );
};

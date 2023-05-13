import React, { useEffect, useState } from 'react';
import { H4 } from '@blueprintjs/core';
import { IpcRendererEvent } from 'electron';
import { FilePicker } from '_renderer/FilePicker';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 15px;
`;

export const AppBody: React.FC = () => {
  const [messages, setMessages] = useState<string[]>(() => []);

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

  return (
    <AppContainer>
      <FilePicker />
      {messages.map(str => <H4>{str}</H4>)}
    </AppContainer>
  );
};

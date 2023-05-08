import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  FormGroup,
  H4,
  InputGroup,
} from '@blueprintjs/core';
import { useSetCurrentUser } from '_renderer/contexts/hooks';
import { Logo } from '_renderer/Logo';
import { styled } from 'styled-components';

interface StyledDialogBodyProps {
  isOpening?: boolean;
}

const StyledDialogBody = styled(DialogBody)<StyledDialogBodyProps>`
  opacity: ${props => (props.isOpening ? 0.8 : 1)};
  transition: opacity 200ms ease-in-out;
`;

const CenteredLogo = styled(Logo)`
  text-align: center;
`
interface LoginProps {
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setCurrentUser = useSetCurrentUser();

  const onOpened = useCallback(() => {
    setIsOpening(false);
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await window.api.invoke('login', { username, password });
      if (result.success) {
        setCurrentUser(username);
        onClose();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('An error occurred during the login process');
    }
  }, [username, password]);

  return (
    <Dialog
      autoFocus={false}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      onOpened={onOpened}
      isOpen={true}
    >
      <StyledDialogBody isOpening={isOpening}>
        <H4><CenteredLogo /></H4>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <InputGroup
              id="username-input"
              inputRef={usernameRef}
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <InputGroup
              id="password-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </FormGroup>
          <Button type="submit" intent="primary" text="Submit" />
        </form>
      </StyledDialogBody>
    </Dialog>
  );
};
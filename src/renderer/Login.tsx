import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  FormGroup,
  H4,
  InputGroup,
} from '@blueprintjs/core';
import { useSetCurrentUser } from '_renderer/contexts/App/hooks';

interface LoginProps {
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setCurrentUser = useSetCurrentUser();

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
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      isOpen={true}
    >
      <DialogBody>
        <H4 style={{
          textAlign: 'center'
        }}>elfsimPLE</H4>
        <form onSubmit={handleSubmit}>
          <FormGroup label="Username" labelFor="username-input">
            <InputGroup
              id="username-input"
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password-input">
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
      </DialogBody>
    </Dialog>
  );
};
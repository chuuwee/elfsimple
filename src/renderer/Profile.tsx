import React, { useCallback } from 'react';
import { Button, Intent, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover2 as Popover } from '@blueprintjs/popover2';
import { useCurrentUser, useSetCurrentUser } from '_renderer/contexts/App/hooks';

export const Profile: React.FC = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const logout = useCallback(async () => {
    await window.api.invoke('logout');
    setCurrentUser(null);
  }, [setCurrentUser]);

  if (currentUser == null) {
    return null;
  }

  return (
    <Popover 
      content={
        <Menu>
          <MenuDivider title={currentUser} />
          <MenuItem intent={Intent.DANGER} text="Log out" onClick={logout} />
        </Menu>
      }
    >
      <Button minimal={true} icon="user" />
    </Popover>
  );
};
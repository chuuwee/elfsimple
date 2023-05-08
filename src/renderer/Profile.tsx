import React, { useCallback } from 'react';
import { Button, Icon, Intent, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover2 as Popover } from '@blueprintjs/popover2';
import { useCurrentUser, useSetCurrentUser } from '_renderer/contexts/hooks';
import styled from 'styled-components';

const ProfileButton = styled(Button)`
  width: 45px;
  height: 45px;
`;

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
      <ProfileButton minimal={true} icon={<Icon icon="user" size={35} />} />
    </Popover>
  );
};
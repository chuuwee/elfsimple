import React from 'react';
import { Alignment, Navbar } from '@blueprintjs/core';
import { Profile } from '_renderer/Profile';
import { Logo } from '_renderer/Logo';

export const AppNavbar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Logo />
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Profile />
      </Navbar.Group>
    </Navbar>
  );
};

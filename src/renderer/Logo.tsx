import React from 'react';
import styled from "styled-components";

const HeaderText = styled.div`
  -webkit-text-stroke: 1px black;
  font-family: arial;
  font-size: 39px;
  font-weight: bold;
  line-height: 47px;
`;

const LightGold = styled.span`
  color: rgb(234,178,40);
`;

const DarkGold = styled.span`
  color: rgb(174,106,28);
`;

export const Logo: React.FC = () => (
  <HeaderText>
    <LightGold>elfsim</LightGold><DarkGold>ple</DarkGold>
  </HeaderText>
);
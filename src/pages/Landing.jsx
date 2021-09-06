import React from 'react';
import styled from 'styled-components';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';

const NAV_HEIGHT = '60px';

const HeaderWrapper = styled.div`
  height: ${NAV_HEIGHT};
`;

const BodyWrapper = styled.div`
  display: flex;
  height: calc(100vh - ${NAV_HEIGHT});
`;

export default function Landing() {
  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>Content Box</ContentBox>
      </BodyWrapper>
    </>
  );
}

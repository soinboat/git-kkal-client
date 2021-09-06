import React from 'react';
import styled from 'styled-components';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import CommitBar from '../components/layouts/CommitBar';

import Button from '../components/Button';

const NAV_HEIGHT = '60px';

const HeaderWrapper = styled.div`
  height: ${NAV_HEIGHT};
`;

const BodyWrapper = styled.div`
  display: flex;
  height: calc(100vh - ${NAV_HEIGHT});
`;

export default function Repo() {
  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Button>test button</Button>
          <Button primary>test button</Button>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>Content Box</ContentBox>
        <CommitBar>Commit bar</CommitBar>
      </BodyWrapper>
    </>
  );
}

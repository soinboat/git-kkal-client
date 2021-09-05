import React from 'react';
import styled from 'styled-components';
import Button2 from '@material-ui/core/Button';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import CommitBar from '../components/layouts/CommitBar';
import CommitMessageBox from '../components/CommitMessageBox';

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
          <Button2 variant="contained" color="primary">
            test button 2
          </Button2>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>Content Box</ContentBox>
        <CommitBar>
          <CommitMessageBox />
        </CommitBar>
      </BodyWrapper>
    </>
  );
}

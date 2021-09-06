import React from 'react';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import CommitBar from '../components/layouts/CommitBar';

import Button from '../components/Button';
import { BodyWrapper, HeaderWrapper } from './styles';

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

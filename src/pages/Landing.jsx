import React, { useCallback, useState } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import { BodyWrapper, HeaderWrapper } from './styles';

import UI from '../constants/ui';
import fetchRepoData from '../utils';

export default function Landing({ saveRepoData }) {
  const [repoUrl, setRepoUrl] = useState('');

  const handleEnterUrlOnSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();

      const repoData = await fetchRepoData(repoUrl);

      saveRepoData(repoData);
    },
    [repoUrl],
  );

  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>
          <Form name="urlForm" onSubmit={handleEnterUrlOnSubmit}>
            <Input
              type="url"
              value={repoUrl}
              placeholder={UI.REPOSITORY_URL}
              onChange={(ev) => setRepoUrl(ev.target.value)}
            />
            <Button>{UI.ENTER_REPO_URL}</Button>
          </Form>
        </ContentBox>
      </BodyWrapper>
    </>
  );
}

Landing.propTypes = {
  saveRepoData: PropTypes.func.isRequired,
};

const Form = styled.form`
  width: 50%;
`;

const Input = styled.input`
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  color: #fff;
  background-color: #343134;
  border: none;
  font-size: 18px;
  height: 44px;
  min-width: 100px;
  cursor: pointer;

  &:hover {
    background-color: #171717;
    border: none;
  }
`;

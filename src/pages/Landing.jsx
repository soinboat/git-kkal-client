import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import { BodyWrapper, HeaderWrapper } from '../components/styles';

import UI from '../constants/ui';

export default function Landing({ repoData, handleRepoUrlSubmit }) {
  const [repoUrl, setRepoUrl] = useState('');

  if (repoData) {
    return <Redirect to="/repository" />;
  }

  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>
          <Form
            name="urlForm"
            onSubmit={(ev) => handleRepoUrlSubmit(ev, repoUrl)}
          >
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

Landing.defaultProps = {
  repoData: {
    repoName: 'repoName',
    branchList: [
      {
        message: 'Message',
      },
    ],
  },
};

Landing.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    branchList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
      .isRequired,
  }),
  handleRepoUrlSubmit: PropTypes.func.isRequired,
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

import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import { BodyWrapper, HeaderWrapper } from '../components/styles';

import UI from '../constants/ui';

export default function Landing({ repoData, handleRepoUrlSubmit }) {
  if (repoData) {
    return <Redirect to="/repository" />;
  }

  const inputRef = useRef(null);

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
            onSubmit={(ev) => handleRepoUrlSubmit(ev, inputRef.current.value)}
          >
            <Input
              type="url"
              ref={inputRef}
              placeholder={UI.REPOSITORY_URL}
              required
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
    logList: [
      {
        message: 'Message',
      },
    ],
  },
};

Landing.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    logList: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      ),
    ).isRequired,
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

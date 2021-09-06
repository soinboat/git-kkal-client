import React, { useCallback, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import { BodyWrapper, HeaderWrapper } from './styles';

export default function Landing() {
  const [repoUrl, setRepoUrl] = useState('');

  const handleEnterUrlOnSubmit = useCallback(async (ev) => {
    ev.preventDefault();

    const data = await axios.get(
      `http://localhost:8000/repository?repoUrl=${repoUrl}`,
    );

    console.log('data', data);
  });

  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>
          <Form name="urlForm" onSubmit={handleEnterUrlOnSubmit}>
            <UrlInput
              type="url"
              value={repoUrl}
              onChange={(ev) => setRepoUrl(ev.target.value)}
            />
            <Button>Enter Repo Url</Button>
          </Form>
        </ContentBox>
      </BodyWrapper>
    </>
  );
}

const Form = styled.form`
  width: 50%;
`;

const UrlInput = styled.input`
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

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loading from './Loading';
import UI from '../constants/ui';

export default function UrlForm({ isLoading, handleRepoUrlSubmit }) {
  if (isLoading === true) {
    return <Loading />;
  }

  const [inputUrl, setInputUrl] = useState(null);

  const handleInputUrlOnChange = useCallback((ev) => {
    setInputUrl(ev.target.value);
  }, []);

  return (
    <Form name="urlForm" onSubmit={(ev) => handleRepoUrlSubmit(ev, inputUrl)}>
      <Input
        type="url"
        placeholder={UI.REPOSITORY_URL}
        onChange={handleInputUrlOnChange}
        required
      />
      <Button>{UI.ENTER_REPO_URL}</Button>
    </Form>
  );
}

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

UrlForm.defaultProps = {
  isLoading: null,
};

UrlForm.propTypes = {
  isLoading: PropTypes.oneOfType([PropTypes.bool]),
  handleRepoUrlSubmit: PropTypes.func.isRequired,
};

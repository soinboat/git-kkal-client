import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadingSpinner from './LoadingSpinner';
import UI from '../constants/ui';

export default function UrlForm({ isLoading, handleSubmit }) {
  if (isLoading === true) {
    return <LoadingSpinner />;
  }

  const [inputUrl, setInputUrl] = useState(null);

  const handleChange = useCallback((ev) => {
    setInputUrl(ev.target.value);
  }, []);

  return (
    <Form name="urlForm" onSubmit={(ev) => handleSubmit(ev, inputUrl)}>
      <Input
        type="url"
        placeholder={UI.REPOSITORY_URL}
        onChange={handleChange}
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
  handleSubmit: PropTypes.func.isRequired,
};

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadingSpinner from './LoadingSpinner';
import UI from '../constants/ui';

export default function UrlForm({ isLoading, handleSubmit }) {
  const [inputUrl, setInputUrl] = useState('');

  const handleChange = useCallback((ev) => {
    setInputUrl(ev.target.value);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Form
          name="urlForm"
          onSubmit={(ev) => {
            handleSubmit(ev, inputUrl);
            setInputUrl('');
          }}
        >
          <InputWrapper>
            <Input
              type="url"
              value={inputUrl}
              placeholder={UI.REPOSITORY_URL}
              onChange={handleChange}
              required
            />
            {isLoading && <LoadingSpinner />}
          </InputWrapper>
          <ButtonWrapper>
            <Button type="submit">{UI.ENTER_REPO_URL}</Button>
          </ButtonWrapper>
        </Form>
      )}
    </>
  );
}

const Form = styled.form`
  display: inline-block;
  min-width: 600px;
  width: 30%;
  padding: 40px;
`;

const InputWrapper = styled.div`
  border: 1px solid #343134;
  z-index: 3;
  max-width: 584;
  width: auto;
  height: 44px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin: 0;
  border: none;
  background-color: transparent;
  color: white;
  outline: none;
  flex: 100%;
  font-size: 16px;
  font-family: arial, sans-serif;
  word-wrap: break-word;
  appearance: auto;
  align-items: flex-start;
  text-align: center;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: block;
  z-index: 0;
  height: 40px;
  padding: 1px;
  text-align: center;
`;

const Button = styled.button`
  min-width: 34px;
  height: 36px;
  margin: 11px 4px;
  padding: 0 16px;
  border: 1px solid #343134;
  background-color: #343134;
  color: #b9b9b9a2;
  font-family: arial, sans-serif;
  font-size: 14px;
  line-height: 27px;
  text-align: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    border: none;
    background-color: #171717;
  }
`;

UrlForm.defaultProps = {
  isLoading: null,
};

UrlForm.propTypes = {
  isLoading: PropTypes.oneOfType([PropTypes.bool]),
  handleSubmit: PropTypes.func.isRequired,
};

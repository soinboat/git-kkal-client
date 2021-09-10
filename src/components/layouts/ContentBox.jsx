import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CONTENT_BOX_WIDTH } from '../../constants/size';

export default function ContentBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: ${CONTENT_BOX_WIDTH};
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { background } }) => background.GREY_1};
  color: ${({ theme: { font } }) => font.WHITE};
`;

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};

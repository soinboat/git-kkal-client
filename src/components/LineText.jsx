import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Log from './Log';

export default function LineText({ logList }) {
  return (
    <Wrapper>
      {logList.map((log, index) => (
        <Log key={`${log + index}`} log={log} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

LineText.propTypes = {
  logList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

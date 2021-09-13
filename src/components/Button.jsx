import styled from 'styled-components';

const Button = styled.button`
  background: ${({ primary }) => (primary ? 'palevioletred' : 'white')};
  color: ${({ primary }) => (primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    transform: translateY(4px);
  }
`;

export default Button;

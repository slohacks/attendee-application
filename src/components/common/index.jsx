import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: 16px;
  color: ${props => (props.filled ? '#ffffff' : '#2b34b0')};
  background: ${props => (props.filled ? '#2b34b0' : '#ffffff')};
  border: 2px solid #2b34b0;
  border-radius: .25rem;
  margin-bottom: 1rem;
  padding: .75rem 2.5rem;
  margin: 1rem 1rem 1rem 0;
`;
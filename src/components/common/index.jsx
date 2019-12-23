import styled from 'styled-components';

const buttonColor = (filled, disabled, attribute) => { /* eslint-disable-line */
  if (disabled && attribute === 'background') return '#d7d7d7';
  if (disabled && attribute === 'color') return '#b5b5b5';
  if (filled && attribute === 'color') return '#ffffff';
  if (filled && attribute === 'background') return '#2b34b0';
  if (attribute === 'color') return '#2b34b0';
  if (attribute === 'background') return '#ffffff';
};

const StyledButton = styled.button`
  font-size: 16px;
  color: ${props => (buttonColor(props.filled, props.disabled, 'color'))};
  background: ${props => (buttonColor(props.filled, props.disabled, 'background'))};
  border: 2px solid ${props => buttonColor(props.filled, props.disabled, 'border')};
  border-radius: .25rem;
  margin-bottom: 1rem;
  padding: .75rem 2rem;
  margin: 1rem 1rem 1rem 0;
  cursor: pointer;
  transition: background .25s, color .25s;
`;

const ErrorText = styled.p`
  color: red;
  margin: 0 0 .25rem 0;
`;

const QuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-column-gap: 2rem;
`;

const QuestionnairePage = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
`;

export {
  StyledButton,
  ErrorText,
  QuestionContainer,
  QuestionnairePage,
};

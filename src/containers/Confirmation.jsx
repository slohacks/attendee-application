import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import requireAuth from '../components/requireAuth';

const Confirmation = (props) => {
  function handleClick() {
    const { history: { push } } = props;
    push('/dashboard');
  }

  return (
    <div>
      <p>
        Thank you for submitting your application!
      </p>
      <Button onClick={handleClick}>
        Back to Dashboard
      </Button>
    </div>
  );
};

Confirmation.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default requireAuth(Confirmation);

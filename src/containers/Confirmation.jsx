import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import requireAuth from '../components/requireAuth';
import Scenic from '../components/Scenic';

const Confirmation = (props) => {
  function handleClick() {
    const { history: { push } } = props;
    push('/dashboard');
  }

  return (
    <div className="container">
      <div className="subContainer">
        <Scenic />
      </div>
      <div className="subContainer">
        <div className="containerPadding">
          <h1>
            Thank you for submitting your application!
          </h1>
          <Button variant="outlined" color="primary" type="button" onClick={handleClick} style={{ marginTop: '1rem' }}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default requireAuth(Confirmation);

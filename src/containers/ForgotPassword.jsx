import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { forgotPassword } from '../actions/index';
import TextInput from '../components/InputTypes/TextInput';

class ForgotPassword extends Component {
  onSubmit(values) {
    const { forgotPassword: forgotPass } = this.props;
    forgotPass(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          component={TextInput}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!re.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'ForgotPasswordForm',
})(
  connect(null, { forgotPassword })(ForgotPassword),
);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import { signUp } from '../actions/index';
import TextInput from '../components/InputTypes/TextInput';

class SignUp extends Component {
  onSubmit(values) {
    this.props.signUp(values); // eslint-disable-line react/destructuring-assignment
  }

  render() {
    const { handleSubmit, valid, errorMessage } = this.props;
    return (
      <div>
        <h1>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            type="text"
            component={TextInput}
          />
          <Field
            label="Enter a password (8 or more characters)"
            name="password"
            type="password"
            component={TextInput}
          />
          <Field
            label="Confirm Password"
            name="confirm_password"
            type="password"
            component={TextInput}
          />
          <Button variant="contained" color="primary" disabled={!valid} type="submit">
            Sign up!
          </Button>
        </form>
        {errorMessage ? (
          <FormHelperText error>
            {errorMessage}
          </FormHelperText>
        ) : null}
      </div>
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

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 characters or more';
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'Confirm Password required';
  } else if (values.confirm_password.length < 8) {
    errors.confirm_password = 'Confirm Password must be 8 characters or more';
  } else if (values.confirm_password.localeCompare(values.password)) {
    errors.confirm_password = 'Passwords do not match';
  }

  if (!values.recaptcha) {
    errors.recaptcha = 'reCAPTCHA must be checked';
  }

  return errors;
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated, errorMessage: state.newUser.errorMessage };
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default reduxForm({
  validate,
  form: 'SignUpForm',
})(
  connect(mapStateToProps, { signUp })(SignUp),
);

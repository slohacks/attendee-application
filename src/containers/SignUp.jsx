import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import { signUp } from '../actions/index';
import TextInput from '../components/InputTypes/TextInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  onSubmit(values) {
    const { signUp: createAccount } = this.props;
    createAccount(values, () => {
      this.setState({ open: true });
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const {
      handleSubmit,
      valid,
      errorMessage,
      history: { push },
    } = this.props;

    const { open } = this.state;
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

          <Button variant="outlined" color="primary" disabled={!valid} type="submit">
            Sign up
          </Button>

          <Button
            color="primary"
            type="button"
            onClick={() => push('/login')}
            style={{ marginLeft: '1rem' }}
          >
            Back
          </Button>
        </form>

        <Dialog onClose={this.handleClose} open={open}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                You have successfully created an account, check your email and verify your account.
            </DialogContentText>
          </DialogContent>
        </Dialog>

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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default reduxForm({
  validate,
  form: 'SignUpForm',
})(
  connect(mapStateToProps, { signUp })(SignUp),
);

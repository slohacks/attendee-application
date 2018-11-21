import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { forgotPassword } from '../actions/index';
import TextInput from '../components/InputTypes/TextInput';

class ForgotPassword extends Component {
  onSubmit(values) {
    const { forgotPassword: forgotPass } = this.props;
    forgotPass(values);
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <div>
        <h1>
          Password Reset
        </h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            type="text"
            component={TextInput}
          />
          <Button variant="outlined" color="primary" type="submit">
            Submit
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

  return errors;
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated, errorMessage: state.lostPass.errorMessage };
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default reduxForm({
  validate,
  form: 'ForgotPasswordForm',
})(
  connect(mapStateToProps, { forgotPassword })(ForgotPassword),
);

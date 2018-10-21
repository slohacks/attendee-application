import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../actions/index';
import reCAPTCHA from '../components/reCaptcha';

class SignUp extends Component {
  onSubmit(values) {
    this.props.signUp(values); // eslint-disable-line react/destructuring-assignment
  }

  static renderField(field) {
    return (
      <div className="input-wrapper">
        <label htmlFor="value" className="label-field">
          {field.label}
          <input
            type={field.type}
            className="input-box"
            {...field.input}
          />
        </label>

        <div className="input-error">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          component={SignUp.renderField}
        />
        <Field
          label="Enter a password (8 or more characters)"
          name="password"
          type="password"
          component={SignUp.renderField}
        />
        <Field
          name="recaptcha"
          component={reCAPTCHA}
        />
        <button
          type="submit"
          className=""
        >
        Submit
        </button>
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

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 characters or more';
  }

  if (!values.recaptcha) {
    errors.recaptcha = 'reCAPTCHA must be checked';
  }

  return errors;
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'SignUpForm',
})(
  connect(null, { signUp })(SignUp),
);

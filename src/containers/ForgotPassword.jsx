import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/index';

class ForgotPassword extends Component {
  onSubmit(values) {
    const { forgotPassword: forgotPass } = this.props;
    forgotPass(values);
  }

  static renderField(field) {
    const {
      label,
      type,
      input,
      meta: { touched, error },
    } = field;
    return (
      <div className="input-wrapper">
        <label htmlFor="value" className="label-field">
          {label}
          <input
            type={type}
            className="input-box"
            {...input}
          />
        </label>

        <div className="input-error">
          {touched ? error : ''}
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
          component={ForgotPassword.renderField}
        />
        <button
          type="submit"
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

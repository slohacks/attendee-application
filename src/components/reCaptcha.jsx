import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

const ReCaptcha = ({ input, meta }) => {
  const { onChange } = input;
  return (
    <div>
      <ReCAPTCHA
        sitekey="sitekeygoeshere"
        onChange={onChange}
      />
      <div className="input-error">
        {meta.touched ? meta.error : ''}
      </div>
    </div>
  );
};

ReCaptcha.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default ReCaptcha;

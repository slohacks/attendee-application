import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadResume } from '../../actions/index';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange }, uploadResume: sendResume, auth } = this.props;
    sendResume(auth.user, e.target.files[0], onChange);
  }

  render() {
    const {
      input,
      label,
      disabled,
      fileName,
      meta: { touched, error },
    } = this.props;
    return (
      <div>
        <label>
          {label}
        </label>
        <input style={{ display: 'none' }} id="files" accept=".pdf" type="file" onChange={this.onChange} onBlur={() => {}} disabled={disabled} />
        <label htmlFor="files">
          {fileName}
        </label>
        <div className="error-message">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { fileName: state.fileName, auth: state.auth };
}

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, { uploadResume })(FileInput);

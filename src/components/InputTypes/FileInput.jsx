import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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
      label,
      disabled,
      fileName,
      errorMessage,
      loading,
    } = this.props;
    return (
      <div
        style={{ marginBottom: '1rem' }}
      >
        <div>
          <FormLabel>
            {label}
          </FormLabel>
        </div>
        <input style={{ display: 'none' }} id="files" accept=".pdf" type="file" onChange={this.onChange} onBlur={() => {}} disabled={disabled} />
        <label
          htmlFor="files"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" color="primary" component="span">
            {fileName}
          </Button>
          {loading ? <CircularProgress color="primary" style={{ marginLeft: '1rem' }} /> : null}
        </label>
        {errorMessage ? (
          <FormHelperText>
            {errorMessage}
          </FormHelperText>
        ) : null }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fileName: state.file.fileName,
    loading: state.file.loading,
    errorMessage: state.file.errorMessage,
    auth: state.auth,
  };
}

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  uploadResume: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, { uploadResume })(FileInput);

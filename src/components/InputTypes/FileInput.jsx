import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
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
      input,
      label,
      disabled,
      fileName,
      meta: { touched, error },
    } = this.props;
    return (
      <div>
        <InputLabel>
          {label}
        </InputLabel>
        <input style={{ display: 'none' }} id="files" accept=".pdf" type="file" onChange={this.onChange} onBlur={() => {}} disabled={disabled} />
        <label htmlFor="files">
          <Button variant="outlined" color="primary" component="span">
            {fileName}
          </Button>
        </label>
        {touched && Boolean(error) ? (
          <FormHelperText>
            {error}
          </FormHelperText>
        ) : '' }
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
  uploadResume: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, { uploadResume })(FileInput);

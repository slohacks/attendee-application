import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveFile } from '../../actions/index';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange }, saveFile } = this.props;
    onChange(e.target.files[0]);
    saveFile(e.target.files[0].name);
  }

  render() {
    const {
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
  return { fileName: state.file };
}

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  saveFile: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, { saveFile })(FileInput);

import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import deburr from 'lodash/deburr';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class Input extends React.PureComponent {
  static handleGetSuggestion(props) {
    return props.label;
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredSuggestions: [],
    };
    this.handleFetch = this.handleFetch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  handleFetch({ value }) {
    const { suggestions } = this.props;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    const newSuggestions = inputLength === 0
      ? []
      : suggestions.filter((suggestion) => {
        const keep = count < 5 && suggestion.label.toLowerCase().match(inputValue);

        if (keep) {
          count += 1;
        }

        return keep;
      });
    this.setState({ filteredSuggestions: newSuggestions });
  }

  handleClear() {
    this.setState({ filteredSuggestions: [] });
  }

  handleSuggestionSelected(event, { suggestionValue, method }) {
    const { input } = this.props;
    input.onChange(suggestionValue);
    if (method === 'enter') {
      event.preventDefault();
    }
  }

  static renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }

  renderInput(inputProps) {
    const { label, meta: { touched, error } } = this.props;
    const errorExist = touched && Boolean(error);
    const {
      classes,
      inputRef = () => {},
      ref,
      ...other
    } = inputProps;
    return (
      <TextField
        fullWidth
        helperText={errorExist ? error : ''}
        error={errorExist}
        label={label}
        InputProps={{
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    );
  }

  render() {
    const { input, disabled } = this.props;
    const { filteredSuggestions } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <AutoSuggest
          suggestions={filteredSuggestions}
          onSuggestionsFetchRequested={this.handleFetch}
          onSuggestionsClearRequested={this.handleClear}
          getSuggestionValue={Input.handleGetSuggestion}
          renderSuggestion={Input.renderSuggestion}
          onSuggestionSelected={this.handleSuggestionSelected}
          inputProps={{ classes, ...input, disabled }}
          renderInputComponent={this.renderInput}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({}.isRequired)).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Input);

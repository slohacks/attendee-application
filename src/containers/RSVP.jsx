import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import InputType from '../components/Questionnaire/InputType';
// import { rsvpResponse } from '../actions/index';
import data from './data/rsvpData.json';
import requireAuth from '../components/requireAuth';

class Rsvp extends Component {
  componentWillMount() {
    const { application, rsvp, history: { push } } = this.props;
    if (application === null || application.status !== 1 || (rsvp && application.status === 1)) {
      push('/dashboard');
    }
  }

  // submitRsvp(formProps) {
  //   const { rsvpResponse: submitRsvp, user, history: { push } } = this.props;
  //   let newForm = null;
  //   if (formProps.attending === 0) {
  //     newForm = { attending: formProps.attending, misc: formProps.misc };
  //   } else if (formProps.attending === 1 && formProps.transportation === 3) {
  //     newForm = {
  //       ...formProps,
  //       norcal: null,
  //       socal: null,
  //       flight: null,
  //       buses: null,
  //     };
  //   } else if (formProps.attending
  // === 1 && formProps.transportation
  // === 1 && formProps.buses === 'Northern California') {
  //     newForm = { ...formProps, socal: null, flight: null };
  //   } else if (formProps.attending
  // === 1 && formProps.transportation
  // === 1 && formProps.buses === 'Southern California') {
  //     newForm = { ...formProps, norcal: null, flight: null };
  //   } else if (formProps.attending && formProps.transportation === 2) {
  //     newForm = { ...formProps, norcal: null, socal: null };
  //   } else {
  //     newForm = {
  //       ...formProps,
  //       flight: null,
  //       socal: null,
  //       norcal: null,
  //     };
  //   }
  //   submitRsvp(user, newForm, push);
  // }

  render() {
    const {
      attendingQuestion,
      transportationQuestion,
      busQuestion,
      soCalQuestion,
      norCalQuestion,
      flightQuestion,
      handleSubmit,
      valid,
      history: { push },
    } = this.props;
    return (
      <div className="sides">
        <h1>RSVP Questionnaire</h1>
        <form onSubmit={handleSubmit(this.submitRsvp.bind(this))}>
          <InputType
            key={data.questions[0].id}
            disabled={false}
            question={data.questions[0]}
          />
          {attendingQuestion === 1 && (
            <InputType
              key={data.questions[1].id}
              disabled={false}
              question={data.questions[1]}
            />
          )}

          {attendingQuestion === 1 && (
            <InputType
              key={data.questions[2].id}
              disabled={false}
              question={data.questions[2]}
            />
          )}

          {attendingQuestion === 1 && transportationQuestion === 1 && (
            <InputType
              key={data.questions[3].id}
              disabled={false}
              question={data.questions[3]}
            />
          )}

          {attendingQuestion === 1 && busQuestion === 'Southern California' && transportationQuestion === 1 && (
            <InputType
              key={data.questions[4].id}
              disabled={false}
              question={data.questions[4]}
            />
          )}

          {attendingQuestion === 1 && busQuestion === 'Northern California' && transportationQuestion === 1 && (
            <InputType
              key={data.questions[5].id}
              disabled={false}
              question={data.questions[5]}
            />
          )}

          {attendingQuestion === 1 && transportationQuestion === 2 && (
            <InputType
              key={data.questions[6].id}
              disabled={false}
              question={data.questions[6]}
            />
          )}

          {(soCalQuestion
          || norCalQuestion
          || flightQuestion
          || attendingQuestion === 0
          || transportationQuestion === 3) && (
            <InputType
              key={data.questions[7].id}
              disabled={false}
              question={data.questions[7]}
            />
          )}
          <Button color="secondary" onClick={() => push('/dashboard')} type="button">
            BACK
          </Button>
          <Button
            variant="outlined"
            color="primary"
            disabled={!valid}
            type="submit"
            style={{
              marginLeft: '1rem',
            }}
          >
            SUBMIT RSVP
          </Button>
        </form>
      </div>
    );
  }
}

Rsvp.defaultProps = {
  rsvp: true,
  application: null,
  attendingQuestion: null,
  transportationQuestion: null,
  soCalQuestion: null,
  norCalQuestion: null,
  flightQuestion: null,
  busQuestion: null,
};

Rsvp.propTypes = {
  attendingQuestion: PropTypes.number,
  busQuestion: PropTypes.string,
  transportationQuestion: PropTypes.number,
  soCalQuestion: PropTypes.string,
  norCalQuestion: PropTypes.string,
  flightQuestion: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // rsvpResponse: PropTypes.func.isRequired,
  // user: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  application: PropTypes.shape(),
  rsvp: PropTypes.bool,
};

Rsvp = reduxForm({
  form: 'RSVP Form',
})(Rsvp);

const selector = formValueSelector('RSVP Form');
Rsvp = connect(
  (state) => {
    const attendingQuestion = selector(state, data.questions[0].id);
    const transportationQuestion = selector(state, data.questions[2].id);
    const busQuestion = selector(state, data.questions[3].id);
    const soCalQuestion = selector(state, data.questions[4].id);
    const norCalQuestion = selector(state, data.questions[5].id);
    const flightQuestion = selector(state, data.questions[6].id);
    const { user } = state.auth;
    const { application, rsvp } = state.application;
    return {
      attendingQuestion,
      transportationQuestion,
      busQuestion,
      soCalQuestion,
      norCalQuestion,
      flightQuestion,
      user,
      application,
      rsvp,
    };
  },
  null,
)(Rsvp);

export default requireAuth(Rsvp);

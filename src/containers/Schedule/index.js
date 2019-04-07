import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSchedule } from '../../actions';

export class Schedule extends Component {
  render() {
    return <div>SCHEDULE</div>;
  }
}

export const mapStateToProps = state => ({
  schedule: state.schedule,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  setSchedule: schedule => dispatch(setSchedule(schedule))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);

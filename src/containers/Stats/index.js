import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { Dropdown } from '../../components/Dropdown';
// import { getUserStats } from '../../thunks/createUser';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { connect } from 'react-redux';
import { setError, setStats } from '../../actions';
import PropTypes from 'prop-types';

export class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: this.props.user,
      stats: {
        name: this.props.stats.name || "",
        totalBookings: this.props.stats.totalBookings || "",
        totalMentorHours: this.props.stats.totalMentorHours || "",
        totalHoursMentored: this.props.stats.totalHoursMentored || "",
        mentees: this.props.stats.mentees || []
      }
    })
  }

  componentDidMount() {
    this.getUserStats();
  }

  getUserStats = async () => {
    const id = this.props.user.id;
    const statsQuery = gql.getUserStats(id);
    try {
      const statsResponse = await fetchData(statsQuery);
      const stats = statsResponse.getUserStats;
      this.props.setStats(stats);
      this.setState({
        stats: this.props.stats
      });
    } catch (error) {
      this.props.setError(error.message);
    }
  }

  render() {
    const stats = this.state.stats;
    return (
      <section id="stats-card">
        <h1>Stats for {stats.name}</h1>
        <ul>
          <li>
            Total Paired Sessions Booked: { stats.totalBookings }
          </li>
          <li>
            Total Hours As a Paired Mentor: {stats.totalMentorHours}
          </li>
          <li>
            Total Hours As Paired Mentee: {stats.totalHoursMentored}
          </li>
          <li>
            Students You've Mentored:
            <ul>
              {stats.mentees.map(
                function(mentee){
                  return <li>{mentee.name}</li>;
                }
              )}
            </ul>
          </li>
        </ul>
      </section>
    )
  };
}

export const mapStateToProps = state => ({
  user: state.user,
  stats: state.stats
});

export const mapDispatchToProps = dispatch => ({
  setStats: stats => dispatch(setStats(stats)),
  setError: error => dispatch(setError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

Stats.propTypes = {
  firebaseID: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  stats: PropTypes.object,
  user: PropTypes.object
};

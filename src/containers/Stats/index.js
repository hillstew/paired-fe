import React, { Component } from 'react';
// import { Stats } from '../../components/Stats';
// import { TemplateCard } from '../../components/TemplateCard';
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
      <div className='Stats'>
        <h2 className='Stats--h2'>Stats for {stats.name}   <span role='img' aria-label='upward chart emoji'>
        📈 </span></h2>
          <section className="StatsCards--section">
            <div className='StatsCard'>
            <h2>
              Total Paired Sessions Booked</h2> <p className='StatsCard--p'>{ stats.totalBookings }</p>
            </div>
            <div className='StatsCard'>
              <h2>
                Total Hours As a Paired Mentor</h2> <p className='StatsCard--p'>{stats.totalMentorHours}</p>
            </div>
            <div className='StatsCard'>
              <h2>
                Total Hours As Paired Mentee</h2> <p className='StatsCard--p'>{stats.totalHoursMentored}</p>
            </div>
            <div className='StatsCard'>
              <h2>
              Students You've Mentored
              </h2>
                <p>{stats.mentees.map(
                  function(mentee){
                    return <p className='StatsCard--name'>{mentee.name}</p>;
                  }
                )}</p>
            </div>
        </section>
      </div>
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

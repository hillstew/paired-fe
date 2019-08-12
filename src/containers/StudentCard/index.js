import React, { Component } from 'react';
import { setPairingId } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class StudentCard extends Component {
  handleClick = id => {
    this.props.history.push(`/confirm/${id}`);
  };

  createList = skills => {
    return skills.map((skill, i) => {
      return (
        <li key={i} className='StudentCard-li'>
          {skill}
        </li>
      );
    });
  };

  render() {
    const {
      id,
      name,
      image,
      pronouns,
      skills,
      morning: morningId,
      afternoon: afternoonId,
      lunch: lunchId
    } = this.props.student;
    const { user } = this.props;
    return (
      <section className='StudentCard'>
        <h3 className='StudentCard--header'>
          {name} ({pronouns})
        </h3>
        <div className='StudentCard--profile'>
          <img src={image} alt={name} className='StudentCard--image' />
          <div className='StudentCard--skills-div'>
            <p className='StudentCard--skills-p'>Skills</p>
            <ul className='StudentCard--ul'>{this.createList(skills)}</ul>
          </div>
        </div>
        <div className='StudentCard--div--rows'>
          <div>
            <p className='StudentCard-time-text'>8:00 - 8:30 a.m.</p>
            {morningId && (
              <button
                className='StudentCard--btn'
                id='morning'
                onClick={() => this.handleClick(morningId)}
                disabled={id === user.id}>
                Book Pairing
              </button>
            )}
            {!morningId && <p>Not Available</p>}
          </div>
          <div>
            <p className='StudentCard-time-text'>12:00 - 12:30 p.m.</p>
            {lunchId && (
              <button
                className='StudentCard--btn'
                id='lunch'
                onClick={() => this.handleClick(lunchId)}
                disabled={id === user.id}>
                Book Pairing
              </button>
            )}
            {!lunchId && <p>Not Available</p>}
          </div>
          <div>
            <p className='StudentCard-time-text'>4:10 - 4:40 p.m.</p>
            {afternoonId && (
              <button
                className='StudentCard--btn'
                id='afternoon'
                onClick={() => this.handleClick(afternoonId)}
                disabled={id === user.id}>
                Book Pairing
              </button>
            )}
            {!afternoonId && <p>Not Available</p>}
          </div>
        </div>
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  setPairingId: id => dispatch(setPairingId(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCard);

StudentCard.propTypes = {
  history: PropTypes.object,
  setPairingId: PropTypes.func,
  student: PropTypes.object,
  user: PropTypes.object
};

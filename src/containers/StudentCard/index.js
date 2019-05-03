import React, { Component } from 'react';
import { setPairingId } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class StudentCard extends Component {
  handleClick = id => {
    this.props.history.push(`/confirm/${id}`);
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
        <div className='StudentCard--div--cols'>
          <h3>{name}</h3>
          <img src={image} alt={name} />
          <p className='StudentCard-pronouns'>Pronouns: {pronouns}</p>
          <p className='StudentCard-skills'>
            Skills: {skills[0]} & {skills[1]}
          </p>
        </div>
        <div className='StudentCard--div--rows'>
          <div>
            <p className='StudentCard-time-text'>8:00 - 8:50 a.m.</p>
            {morningId && (
              <button
                className='StudentCard--btn'
                id='morning'
                onClick={() => this.handleClick(morningId)}
                disabled={id === user.id}>
                Book It
              </button>
            )}
            {!morningId && <p>NOT AVAILABLE</p>}
          </div>
          <div>
            <p className='StudentCard-time-text'>12:00 - 12:50 p.m.</p>
            {lunchId && (
              <button
                className='StudentCard--btn'
                id='lunch'
                onClick={() => this.handleClick(lunchId)}
                disabled={id === user.id}>
                Book It
              </button>
            )}
            {!lunchId && <p>NOT AVAILABLE</p>}
          </div>
          <div>
            <p className='StudentCard-time-text'>4:00 - 4:50 p.m.</p>
            {afternoonId && (
              <button
                className='StudentCard--btn'
                id='afternoon'
                onClick={() => this.handleClick(afternoonId)}
                disabled={id === user.id}>
                Book It
              </button>
            )}
            {!afternoonId && <p>NOT AVAILABLE</p>}
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
  user: PropTypes.object,
};
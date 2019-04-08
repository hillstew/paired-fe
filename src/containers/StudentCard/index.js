import React, { Component } from 'react';
import { setPairingId } from '../../actions';
import { connect } from 'react-redux';

export class StudentCard extends Component {
  handleClick = id => {
    const { history, setPairingId } = this.props;
    setPairingId(id);
    history.push('/confirm');
  };

  render() {
    const {
      name,
      image,
      pronouns,
      skills,
      morning: morningId,
      afternoon: afternoonId,
      lunch: lunchId
    } = this.props.student;
    return (
      <section className='StudentCard'>
        <div className='StudentCard--div--cols'>
          <h3>{name}</h3>
          <img
            src={image}
            alt={name}
          />
          <p className='StudentCard-pronouns'>Pronouns: {pronouns}</p>
          <p className='StudentCard-skills'>
            Skills: {skills.map(skill => `${skill} `)}
          </p>
        </div>
        <div className='StudentCard--div--rows'>
          <div>
            <p className='StudentCard-time-text'>8:00 - 8:50 a.m.</p>
            {morningId && (
              <button className='StudentCard--btn' onClick={() => this.handleClick(morningId)}>
                Book It
              </button>
            )}
            {!morningId && <p>Not available</p>}
          </div>
          <div>
            <p className='StudentCard-time-text'>12:00 - 12:50 p.m.</p>
            {lunchId && (
              <button className='StudentCard--btn' onClick={() => this.handleClick(lunchId)}>
                Book It
              </button>
            )}
            {!lunchId && <p>Not available</p>}
          </div>
          <div>
            <p className='StudentCard-time-text'>4:00 - 4:50 p.m.</p>
            {afternoonId && (
              <button className='StudentCard--btn' onClick={() => this.handleClick(afternoonId)}>
                Book It
              </button>
            )}
            {!afternoonId && <p>Not available</p>}
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPairingId: id => dispatch(setPairingId(id))
});

export default connect(
  null,
  mapDispatchToProps
)(StudentCard);

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
      id,
      image,
      pronouns,
      skills,
      morning,
      afternoon,
      lunch
    } = this.props.student;
    return (
      <section className='StudentCard'>
        <div className='StudentCard--div--cols'>
          <h3>{name}</h3>
          <img
            src='https://user-images.githubusercontent.com/40586291/55676112-122abd00-588b-11e9-9f5d-8bda5cfa35f5.jpg'
            alt={name}
          />
          <p>Pronouns: {pronouns}</p>
          <p>Skills: {skills.map(skill => `${skill} `)}</p>
        </div>
        <div className='StudentCard--div--rows'>
          <div>
            <p>8:00 - 8:50 a.m.</p>
            {morning ? (
              <button onClick={() => this.handleClick(morning)}>
                Book It
              </button>
            ) : (
              <p>NOT AVAIL</p>
            )}
          </div>
          <div>
            <p>12:00 - 12:50 p.m.</p>
            {lunch ? (
              <button onClick={() => this.handleClick(lunch)}>
                Book It
              </button>
            ) : (
              <p>NOT AVAIL</p>
            )}
          </div>
          <div>
            <p>4:00 - 4:50 p.m.</p>
            {afternoon ? (
              <button onClick={() => this.handleClick(afternoon)}>
                Book It
              </button>
            ) : (
              <p>NOT AVAIL</p>
            )}
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

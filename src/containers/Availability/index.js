import React, { Component } from 'react';

export class Availability extends Component {
  constructor() {
    super();
    this.state = { availabilities: Array(15).fill(false) };
  }

  handleClick = (i) => {
    const { availabilities } = this.state;
    const newAvailabilities = availabilities.map((availability, j) => {
      return i === j ? !availability : availability;
    });
    this.setState({ availabilities: newAvailabilities });
  };

  render() {
    const { availabilities } = this.state;
    return (
      <section className='Availability'>
        <ul className='day--container'>
          <li></li>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
        </ul>
        <div className='button--container'>
          <span>morning</span>
          <span>lunch</span>
          <span>afternoon</span>
          {availabilities.map((availability, i) => {
            return (
              <button
                key={i}
                className={'button--' + availability}
                onClick={() => this.handleClick(i)}
              >
                {availability ? 'available' : 'unavailable'}
              </button>
            );
          })}
        </div>
        <button className='Availability--submit' onClick={this.handleSumbit}>
          submit
        </button>
      </section>
    );
  }
}

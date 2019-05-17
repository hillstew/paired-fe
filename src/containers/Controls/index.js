import React, { Component } from 'react';
import { Dropdown } from '../../components/Dropdown';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { setError, setAvailPairings } from '../../actions';
import { connect } from 'react-redux';
import { Pairings } from '../../components/Pairings';
import { getDatesToDisplay } from '../../helpers';
import PropTypes from 'prop-types';

export class Controls extends Component {
  constructor() {
    super();
    this.state = {
      program: '',
      module: '',
      date: '',
      message: ''
    };
  }

  handleChange = event => {
    let { value, name } = event.target;
    name = name.toLowerCase();
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    let { program, module, date } = this.state;
    if (module === 'Graduate') module = '5';
    const { setAvailPairings } = this.props;
    try {
      const body = gql.getAvailablePairings(program, parseInt(module), date);
      const response = await fetchData(body);
      if (response.getAvailablePairings.length) {
        setAvailPairings(response.getAvailablePairings);
        this.setState({ message: '' });
      } else {
        setAvailPairings([]);
        this.setState({
          message: `Oh bummer! 😰 There are no pairings available for ${program} module ${module} on ${date}. Try a different date or module. 😀`
        });
      }
    } catch (error) {
      this.props.setError(error.message);
    }
  };

  checkDropdowns = () => {
    const { program, module, date } = this.state;
    return !program || !module || !date;
  };

  render() {
    const currentDay = new Date();
    const dates = getDatesToDisplay(currentDay, 15);
    const { availPairings } = this.props;
    const { message } = this.state;
    return (
      <div className='Controls'>
        <h2 className='Controls--h2'>Book a Pairing</h2>
        <p className='Controls--explanation'>
          Choose options to find more experienced students to pair with
        </p>
        <p className='Controls--explanation light'>
          e.g. Mod 1 students would likely search for Mod 2 students
        </p>
        <section className='Controls--section'>
          <Dropdown
            options={['FE', 'BE']}
            label='Program'
            handleChange={this.handleChange}
          />
          <Dropdown
            options={['1', '2', '3', '4', 'Graduate']}
            label='Module'
            handleChange={this.handleChange}
          />
          <Dropdown
            options={dates}
            label='Date'
            handleChange={this.handleChange}
          />
        </section>
        <button
          onClick={this.handleClick}
          className='Controls--avail-btn'
          disabled={this.checkDropdowns()}
        >
          Show Available Pairings
        </button>
        {message !== '' && <p className='Controls-error'>{message}</p>}
        {availPairings.length !== 0 && (
          <Pairings openPairings={availPairings} history={this.props.history} />
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  availPairings: state.availPairings
});

export const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  setAvailPairings: pairings => dispatch(setAvailPairings(pairings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);

Controls.propTypes = {
  availPairings: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  setAvailPairings: PropTypes.func,
  setError: PropTypes.func
};

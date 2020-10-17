import React, { Component } from 'react';
import { Dropdown } from '../../components/Dropdown';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { setError, setAvailableRocks } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

export class RockListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program: this.props.user.program,
      module: this.props.user.module,
      message: "",
    };
  }

  handleClick = async () => {
    let { program, module } = this.state;
    if (module === 'Graduate') module = '5';
    const { setAvailableRocks } = this.props;
    try {
      const body = gql.findAvailableRocks(program, parseInt(module));
      const response = await fetchData(body);
      if (response.findAvailableRocks.length) {
        setAvailableRocks(response.findAvailableRocks);
        this.setState({ message: '' });
      } else {
        setAvailableRocks([]);
        this.setState({
          message: `Oh bummer! 😰 There are no rocks available for the ${program} program and module ${module}. Try a different program or module. 😀`
        });
      }
    } catch (error) {
      this.props.setError(error.message);
    }
  };

  handleChange = event => {
    let { value, name } = event.target;
    name = name.toLowerCase();
    this.setState({ [name]: value });
  };

  checkDropdowns = () => {
    const { program, module } = this.state;
    return !program || !module;
  };

  render() {
    const { message } = this.state;
    return(
      <div className='RockListing'>
        <h2 className='RockListing--h2'>Available Rocks</h2>
        <p className='RockListing--explanation'>
          View/Find your Rock (mentor) or Pebble (mentee)
        </p>
        <p className='RockListing--explanation light'>
          e.g. A Mod 2 student would likely be a Rock for Mod 1 student
        </p>
        <section className='RockListing--section'>
          <Dropdown
            options={['FE', 'BE']}
            label='Program'
            handleChange={this.handleChange}
            required={true}
          />
          <Dropdown
            options={['1', '2', '3', '4', 'Alumni']}
            label='Module'
            handleChange={this.handleChange}
            required={true}
          />
        </section>
        <button
          onClick={this.handleClick}
          className='RockListing--avail-btn'
          disabled={this.checkDropdowns()}
        >
          Show Available Rocks
        </button>
        {message !== '' && <p className='RockListing-error'>{message}</p>}
        {/* {availPairings.length !== 0 && (
          <Pairings openPairings={availPairings} history={this.props.history} />
        )} */}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  availableRocks: state.availableRocks
});

export const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  setAvailableRocks: rocks => dispatch(setAvailableRocks(rocks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RockListing);

RockListing.propTypes = {
  availableRocks: PropTypes.array,
  // history: PropTypes.object,
  // location: PropTypes.object,
  // match: PropTypes.object,
  setAvailableRocks: PropTypes.func,
  setError: PropTypes.func
};
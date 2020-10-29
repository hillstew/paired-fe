import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as gql from "../../queries";
import { fetchData } from "../../utils";
import { Redirect } from 'react-router-dom'
import { setError, setRockAndPebble } from '../../actions'

export class AvailableRockCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdRelationship: false,
      message: ''
    };
  }

  createList = (skills) => {
    return skills.map((skill, i) => {
      return (
        <li key={i} className="AvailableRockCard-li">
          {skill}
        </li>
      );
    });
  };

  handleClick = async () => {
    const { rock, user } = this.props;
    try {
      const body = gql.createRockPebbleRelationship(rock, user);
      const response = await fetchData(body);
      if(response['createRockPebbleRelationship']) {
        this.props.setRockAndPebble(response.createRockPebbleRelationship);
        this.setState({ createdRelationship: true });
      } else {
        this.setState({ message: 'Looks like something went wrong. Try again or submit an issue on GitHub.'})
      }
    } catch (error) {
      this.props.setError(error.message);
    }
  };

  render() {
    const { id, name, image, pronouns, skills } = this.props.rock;
    const { user } = this.props;
    const { createdRelationship, message } = this.state;
    return (
      <section className="AvailableRockCard">
        <h3 className="AvailableRockCard--header">
          {name} ({pronouns})
        </h3>
        <div className="AvailableRockCard--profile">
          <img src={image} alt={name} className="AvailableRockCard--image" />
          <div className="AvailableRockCard--skills-div">
            <p className="AvailableRockCard--skills-p">Skills</p>
            <ul className="AvailableRockCard--ul">{this.createList(skills)}</ul>
          </div>
        </div>
        <div className="AvailableRockCard--btn-area">
          <button
            className="AvailableRockCard--btn"
            onClick={() => this.handleClick()}
            disabled={id === user.id}
          >
            Ask to be your Rock
          </button>
          {createdRelationship && <Redirect to="/rock-pebble" />}
          {message && <p className="AvailableRockCard--error-p">{message}</p>}
        </div>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
  setError: error => dispatch(setError(error)),
  setRockAndPebble: response => dispatch(setRockAndPebble(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRockCard);

AvailableRockCard.propTypes = {
  student: PropTypes.object,
  user: PropTypes.object,
};

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as gql from "../../queries";
import { fetchData } from "../../utils";
import { Redirect } from 'react-router-dom'

export class AvailableRockCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdRelationship: false
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
      console.log(response)
      if (response.createRockPebbleRelationship) {
        this.setState({ createdRelationship: true });
      } else {
        //     setAvailableRocks([]);
        //     this.setState({
        //       message: `Oh bummer! 😰 There are no rocks available for the ${program} program and module ${module}. Try a different program or module. 😀`,
        //     });
      }
    } catch (error) {
      this.props.setError(error.message);
    }
  };

  render() {
    const { id, name, image, pronouns, skills } = this.props.rock;
    const { user } = this.props;
    const { createdRelationship } = this.state;
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
        <button
          className="AvailableRockCard--btn"
          onClick={() => this.handleClick()}
          disabled={id === user.id}
        >
          Ask to be your Rock
        </button>
        {createdRelationship && <Redirect to="/rock-pebble" />}
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
});

export const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRockCard);

AvailableRockCard.propTypes = {
  student: PropTypes.object,
  user: PropTypes.object,
};

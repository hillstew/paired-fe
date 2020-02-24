import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown } from '../../components/Dropdown';
import { createUser } from '../../thunks/createUser';
import { updateUser } from '../../thunks/updateUser';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
      email: this.props.email || '',
      phoneNumber: this.props.phoneNumber || '',
      program: '',
      module: '',
      pronouns: '',
      slack: '',
      submitted: false,
      'skill 1': '',
      'skill 2': '',
      'skill 3': ''
    };
  }

  checkDropdowns = () => {
    const { program, module, email, phoneNumber, name, slack } = this.state;
    return !program || !module || !email || !phoneNumber || !name || !slack;
  };

  componentDidMount() {
    const { match, user } = this.props;
    if (match.path === '/edit-profile') {
      const { name, email, phoneNumber, pronouns, slack, program, module, skills } = user;
      let moduleToSave = module.toString();
      if (module === 5) moduleToSave = 'Graduate';
      this.setState({
        name,
        email,
        phoneNumber,
        pronouns,
        slack,
        program,
        module: moduleToSave,
        'skill 1': skills[0] || '',
        'skill 2': skills[1] || '',
        'skill 3': skills[2] || ''
      });
    }
  }

  formatUserData = () => {
    const { image, firebaseID } = this.props;
    const { module, program, name, email, phoneNumber, pronouns, slack } = this.state;
    let moduleToSave = module;
    if (module === 'Graduate') moduleToSave = '5';
    const user = {
      name,
      email,
      phoneNumber,
      image,
      firebaseID,
      program,
      pronouns,
      slack,
      module: moduleToSave,
      skill1: this.state['skill 1'],
      skill2: this.state['skill 2'],
      skill3: this.state['skill 3'],
      message: ''
    };
    return user;
  };

  handleChange = event => {
    let { value, name } = event.target;
    name = name.toLowerCase();
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { match, user, updateUser } = this.props;
    if (match.path !== '/edit-profile') {
      this.setState({ submitted: true });
    } else {
      await updateUser({...this.formatUserData(), id: user.id });
      this.setState({ message: 'Profile updated'}, () => {
        setTimeout(this.removeMessage, 1000);
      });
    }
  };

  removeMessage = () => {
    this.setState({ message: ''});
  }

  render() {
    const { name, slack, email, phoneNumber, pronouns, module, program, message, submitted } = this.state;
    const skills = [
      'grid',
      'flexbox',
      'mythical creatures',
      'react',
      'jsFun',
      'rspec',
      'rails',
      'ruby',
      'jest/enzyme',
      'docker',
      'lightning talks',
      'javascript',
      'css',
      'active record',
      'SQL',
      'sinatra'
    ];
    if (!submitted) {
      return (
        <form onSubmit={this.handleSubmit} className='Profile--form'>
          <h2 className='Profile--h2'>Please complete your profile</h2>
          <div className='Profile--div'>
            <div className='Profile--div--flex'>
              <label htmlFor='name'>
                Name<span className='Profile--asterisk'>*</span>
              </label>
              <input
                className='Profile--input'
                value={name}
                name='name'
                onChange={this.handleChange}
              />
              <label htmlFor='Pronouns'>Pronouns</label>
              <input
                className='Profile--input'
                value={pronouns}
                label='Pronouns'
                name='pronouns'
                onChange={this.handleChange}
                placeholder='e.g. she/her, he/him, they/them, etc.'
                maxLength='10'
              />
              <label htmlFor='email'>
                Email<span className='Profile--asterisk'>*</span>
              </label>
              <input
                className='Profile--input'
                value={email}
                name='email'
                onChange={this.handleChange}
              />
              <label htmlFor='phoneNumber'>
                Phone Number<span className='Profile--asterisk'>*</span>
              </label>
              <input
                className='Profile--input'
                value={phoneNumber}
                name='phoneNumber'
                onChange={this.handleChange}
              />
              <label htmlFor='slack'>
                Slack handle<span className='Profile--asterisk'>*</span>
              </label>
              <input
                className='Profile--input Profile--input-slack'
                value={slack}
                name='slack'
                onChange={this.handleChange}
                placeholder='@'
              />
            </div>
            <Dropdown
              className='Profile--Dropdown'
              options={['FE', 'BE']}
              label='Program'
              handleChange={this.handleChange}
              required={true}
              selectedItem={program}
            />
            <Dropdown
              className='Profile--Dropdown'
              options={[1, 2, 3, 4, 'Graduate']}
              label='Module'
              handleChange={this.handleChange}
              required={true}
              selectedItem={module}
            />
            <h4>Provide skills you can help others with</h4>
            <Dropdown
              className='Profile--Dropdown'
              options={skills}
              label='Skill 1'
              handleChange={this.handleChange}
              selectedItem={this.state['skill 1']}
            />
            <Dropdown
              className='Profile--Dropdown'
              options={skills}
              label='Skill 2'
              handleChange={this.handleChange}
              selectedItem={this.state['skill 2']}
            />
            <div className='Profile--div--flex'>
              <label htmlFor='Skill 3'>Skill 3</label>
              <input
                className='Profile--input'
                name='Skill 3'
                value={this.state['skill 3']}
                placeholder='Additional skill - max 20 characters'
                maxLength='20'
                onChange={this.handleChange}
              />
            </div>
          </div>
          <p className='Profile--message'>{message}</p>
          <button disabled={this.checkDropdowns()} className='Profile--button'>
            Submit
          </button>
        </form>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/set-availability',
            state: { user: this.formatUserData() }
          }}
        />
      );
    }
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  createUser: (user, availabilities) =>
    dispatch(createUser(user, availabilities)),
  updateUser: user => dispatch(updateUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

Profile.propTypes = {
  createUser: PropTypes.func,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  firebaseID: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.object,
  updateUser: PropTypes.func
};

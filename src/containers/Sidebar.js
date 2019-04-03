import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Sidebar extends Component {
  render() {
    return <aside className="Sidebar">sidebar</aside>;
  }
}

export const mapStateToProps = state => ({
  view: state.view
});

export default connect(mapStateToProps)(Sidebar);

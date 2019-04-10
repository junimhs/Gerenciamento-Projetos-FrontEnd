import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';
import { Container, TeamList, Team } from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log(this.props);
    const { getTeamRequest } = this.props;
    getTeamRequest();
  }

  render() {
    const { teams } = this.props;
    return (
      <Container>
        <TeamList />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});
const mapDispatchToProps = dispatch => bindActionCreators(TeamsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);
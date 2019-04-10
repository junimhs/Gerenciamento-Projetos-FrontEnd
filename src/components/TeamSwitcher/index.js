import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';
import {
  Container, TeamList, Team, NewTeam,
} from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamRequest: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }).isRequired,
    selectTeam: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getTeamRequest } = this.props;
    getTeamRequest();
  }

  handleTeamSelect = (team) => {
    const { selectTeam } = this.props;
    selectTeam(team);
  };

  render() {
    const { teams } = this.props;
    return (
      <Container>
        <TeamList>
          {teams.data.map(team => (
            <Team key={`Gestao${team.id}`} onClick={() => this.handleTeamSelect(team)}>
              <img
                src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
                  team.name
                }`}
                alt={team.name}
              />
            </Team>
          ))}
          <NewTeam onClick={() => {}}>+</NewTeam>
        </TeamList>
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

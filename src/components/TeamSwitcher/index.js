import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';
import AuthActions from '~/store/ducks/auth';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import {
  Container, TeamList, Team, NewTeam, Logout,
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
    openTeamModal: PropTypes.func.isRequired,
    closeTeamModal: PropTypes.func.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  state = {
    newTeam: '',
  };

  componentDidMount() {
    const { getTeamRequest } = this.props;
    getTeamRequest();
  }

  handleTeamSelect = (team) => {
    const { selectTeam } = this.props;
    selectTeam(team);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateTeam = (e) => {
    e.preventDefault();
    const { createTeamRequest } = this.props;
    const { newTeam } = this.state;

    createTeamRequest(newTeam);
  };

  render() {
    const {
      teams, openTeamModal, closeTeamModal, signOut,
    } = this.props;
    const { newTeam } = this.state;
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
          <NewTeam onClick={openTeamModal}>+</NewTeam>
          {teams.teamModalOpen && (
            <Modal>
              <h1>Criar Time</h1>

              <form onSubmit={this.handleCreateTeam}>
                <span>NOME</span>
                <input
                  type="text"
                  name="newTeam"
                  value={newTeam}
                  onChange={this.handleInputChange}
                />

                <Button size="big" type="submit">
                  Salvar
                </Button>
                <Button onClick={closeTeamModal} size="small" color="gray">
                  Cancelar
                </Button>
              </form>
            </Modal>
          )}
        </TeamList>
        <Logout onClick={signOut}>SAIR</Logout>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...TeamsActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);

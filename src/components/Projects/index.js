import React, { Component } from 'react';
import Button from '~/styles/components/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';
import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';
import Modal from '~/components/Modal';
import Members from '~/components/Members';
import { Container, Project, Excluir } from './styles';

class Projects extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    teams: PropTypes.shape({
      header: PropTypes.bool,
    }).isRequired,
    members: PropTypes.shape({
      membersModalOpen: PropTypes.bool,
    }).isRequired,
    projects: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    openMemberModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    deleteProjectRequest: PropTypes.func.isRequired,
    deleteTeamRequest: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    newProject: '',
    idProject: 0,
    idTeam: 0,
    projectConfirm: false,
  };

  componentDidMount() {
    console.log(this.props);
    const { getProjectsRequest, activeTeam } = this.props;
    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateProject = (e) => {
    e.preventDefault();
    const { createProjectRequest } = this.props;
    const { newProject } = this.state;
    createProjectRequest(newProject);
    this.setState({ newProject: '' });
  };

  handleDeleteProject = (id) => {
    const { deleteProjectRequest, deleteTeamRequest } = this.props;
    const { projectConfirm } = this.state;
    if (projectConfirm) {
      deleteProjectRequest(id);
    } else {
      deleteTeamRequest(id);
    }
  };

  handleExcluirProject = (id) => {
    const { openModal } = this.props;
    this.setState({ idProject: id, projectConfirm: true });
    openModal();
  };

  handleExcluirTeam = (id) => {
    const { openModal } = this.props;
    this.setState({ idTeam: id, projectConfirm: false });
    openModal();
  };

  render() {
    const {
      activeTeam,
      projects,
      openProjectModal,
      closeProjectModal,
      closeModal,
      teams,
      openMemberModal,
      members,
    } = this.props;

    const {
      newProject, idProject, idTeam, projectConfirm,
    } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        {teams.header && (
          <header>
            <h1>{activeTeam.name}</h1>
            <div>
              <Button onClick={openProjectModal}> + Novo </Button>
              <Button onClick={openMemberModal}> Membros </Button>
              <Button onClick={() => this.handleExcluirTeam(activeTeam.id)} color="danger">
                Excluir
              </Button>
            </div>
          </header>
        )}
        {projects.data.map(project => (
          <Project key={`Gestao${project.id}`}>
            <p>{project.title}</p>
            <Excluir onClick={() => this.handleExcluirProject(project.id)}>X</Excluir>
          </Project>
        ))}
        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar Projeto</h1>

            <form onSubmit={this.handleCreateProject}>
              <span>NOME</span>
              <input
                type="text"
                name="newProject"
                value={newProject}
                onChange={this.handleInputChange}
              />

              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button onClick={closeProjectModal} size="small" color="gray">
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
        {projects.confirmModalOpen && (
          <Modal>
            <h1>Deseja excluir ?</h1>
            <form>
              <Button
                onClick={() => this.handleDeleteProject(projectConfirm ? idProject : idTeam)}
                size="big"
              >
                Sim
              </Button>
              <Button onClick={closeModal} size="big" color="danger">
                Não
              </Button>
            </form>
          </Modal>
        )}
        {members.membersModalOpen && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
  teams: state.teams,
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...TeamsActions, ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);

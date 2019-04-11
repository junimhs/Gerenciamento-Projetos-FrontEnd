import React, { Component } from 'react';
import Button from '~/styles/components/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';
import Modal from '~/components/Modal';
import { Container, Project, Excluir } from './styles';

class Projects extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    projects: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    deleteProjectRequest: PropTypes.func.isRequired,
  };

  state = {
    newProject: '',
  };

  componentDidMount() {
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
  };

  handleDeleteProject = (id) => {
    const { deleteProjectRequest } = this.props;
    deleteProjectRequest(id);
  };

  render() {
    const {
      activeTeam, projects, openProjectModal, closeProjectModal,
    } = this.props;

    const { newProject } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Button onClick={openProjectModal}> + Novo </Button>
            <Button onClick={() => {}}> Membros </Button>
          </div>
        </header>
        {projects.data.map(project => (
          <Project key={`Gestao${project.id}`}>
            <p>{project.title}</p>
            <Excluir onClick={() => this.handleDeleteProject(project.id)}>X</Excluir>
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProjectsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);

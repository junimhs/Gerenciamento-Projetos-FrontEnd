import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
  openModal: null,
  closeModal: null,
  createProjectRequest: ['title'],
  createProjectSuccess: ['project'],
  deleteProjectRequest: ['id'],
  deleteProjectSuccess: ['id'],
});

export const ProjectsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
  confirmModalOpen: false,
});

export const success = (state, { data }) => state.merge({ data });

export const openProjectsModal = state => state.merge({ projectModalOpen: true });
export const closeProjectsModal = state => state.merge({ projectModalOpen: false });

export const confirmOpenModal = state => state.merge({ confirmModalOpen: true });
export const confirmCloseModal = state => state.merge({ confirmModalOpen: false });

export const createProject = (state, { project }) => state.merge({ data: [...state.data, project] });

export const deleteProject = (state, { id }) => {
  const newData = state.data.filter(dat => dat.id !== id);
  return state.merge({ data: newData });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.OPEN_PROJECT_MODAL]: openProjectsModal,
  [Types.CLOSE_PROJECT_MODAL]: closeProjectsModal,
  [Types.CREATE_PROJECT_SUCCESS]: createProject,
  [Types.DELETE_PROJECT_SUCCESS]: deleteProject,
  [Types.OPEN_MODAL]: confirmOpenModal,
  [Types.CLOSE_MODAL]: confirmCloseModal,
});

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
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
});

export const success = (state, { data }) => state.merge({ data });

export const openModal = state => state.merge({ projectModalOpen: true });
export const closeModal = state => state.merge({ projectModalOpen: false });

export const createProject = (state, { project }) => state.merge({ data: [...state.data, project] });

export const deleteProject = (state, { id }) => {
  const newData = state.data.filter(dat => dat.id !== id);
  return state.merge({ data: newData });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.OPEN_PROJECT_MODAL]: openModal,
  [Types.CLOSE_PROJECT_MODAL]: closeModal,
  [Types.CREATE_PROJECT_SUCCESS]: createProject,
  [Types.DELETE_PROJECT_SUCCESS]: deleteProject,
});

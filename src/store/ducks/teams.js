import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// O request ira ser chamado apois executar chama o success
const { Types, Creators } = createActions({
  getTeamRequest: null,
  getTeamSuccess: ['data'],
  selectTeam: ['team'],
  openTeamModal: null,
  closeTeamModal: null,
  closeHeader: null,
  createTeamRequest: ['name'],
  createTeamSuccess: ['team'],
  deleteTeamRequest: ['id'],
  deleteTeamSuccess: ['id'],
});

export const TeamsTypes = Types;
export default Creators;

// Onde fica nosso state
export const INITIAL_STATE = Immutable({
  data: [],
  teamModalOpen: false,
  active: JSON.parse(localStorage.getItem('@Gestao:team')) || null,
  header: true,
});

// Edita nosso state apos chamar o success
export const success = (state, { data }) => state.merge({ data });

export const selectTeam = (state, { team }) => {
  localStorage.setItem('@Gestao:team', JSON.stringify(team));
  return state.merge({ active: team, header: true });
};

export const openModal = state => state.merge({ teamModalOpen: true });
export const closeModal = state => state.merge({ teamModalOpen: false });

export const closeHeaderTeam = state => state.merge({ header: false });

export const createSuccess = (state, { team }) => state.merge({ data: [...state.data, team] });

export const deleteTeam = (state, { id }) => {
  const newData = state.data.filter(dat => dat.id !== id);
  return state.merge({ data: newData });
};

// Ação para ser chamado no saga
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAM_SUCCESS]: success,
  [Types.SELECT_TEAM]: selectTeam,
  [Types.OPEN_TEAM_MODAL]: openModal,
  [Types.CLOSE_TEAM_MODAL]: closeModal,
  [Types.CREATE_TEAM_SUCCESS]: createSuccess,
  [Types.DELETE_TEAM_SUCCESS]: deleteTeam,
  [Types.CLOSE_HEADER]: closeHeaderTeam,
});

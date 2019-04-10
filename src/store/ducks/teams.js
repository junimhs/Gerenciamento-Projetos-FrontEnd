import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// O request ira ser chamado apois executar chama o success
const { Types, Creators } = createActions({
  getTeamRequest: null,
  getTeamSuccess: ['data'],
  selectTeam: ['team'],
  openTeamModal: null,
  closeTeamModal: null,
});

export const TeamsTypes = Types;
export default Creators;

// Onde fica nosso state
export const INITIAL_STATE = Immutable({
  data: [{}],
  teamModalOpen: false,
  active: JSON.parse(localStorage.getItem('@Gestao:team')) || null,
});

// Edita nosso state apos chamar o success
export const success = (state, { data }) => state.merge({ data });

export const selectTeam = (state, { team }) => {
  localStorage.setItem('@Gestao:team', JSON.stringify(team));
  return state.merge({ active: team });
};

export const openModal = state => state.merge({ teamModalOpen: true });
export const closeModal = state => state.merge({ teamModalOpen: false });

// Ação para ser chamado no saga
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAM_SUCCESS]: success,
  [Types.SELECT_TEAM]: selectTeam,
  [Types.OPEN_TEAM_MODAL]: openModal,
  [Types.CLOSE_TEAM_MODAL]: closeModal,
});

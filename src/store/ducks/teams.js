import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// O request ira ser chamado apois executar chama o success
const { Types, Creators } = createActions({
  getTeamRequest: null,
  getTeamSuccess: ['data'],
});

export const TeamsTypes = Types;
export default Creators;

// Onde fica nosso state
export const INITIAL_STATE = Immutable({
  data: [{}],
});

// Edita nosso state apos chamar o success
export const success = (state, { data }) => {
  console.log(typeof data);
  return state.merge({ data });
};

// Ação para ser chamado no saga
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAM_SUCCESS]: success,
});

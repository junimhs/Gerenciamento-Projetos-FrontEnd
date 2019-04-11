import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  openMemberModal: null,
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({});

export const reducer = createReducer(INITIAL_STATE, {});

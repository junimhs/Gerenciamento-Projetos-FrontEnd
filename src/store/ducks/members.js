import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  openMemberModal: null,
  closeMemberModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  membersModalOpen: false,
  data: [],
});

export const openMembersModal = state => state.merge({ membersModalOpen: true });
export const closeMembersModal = state => state.merge({ membersModalOpen: false });

export const membersSuccess = (state, { data }) => state.merge({ data });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBER_MODAL]: openMembersModal,
  [Types.CLOSE_MEMBER_MODAL]: closeMembersModal,
  [Types.GET_MEMBERS_SUCCESS]: membersSuccess,
});

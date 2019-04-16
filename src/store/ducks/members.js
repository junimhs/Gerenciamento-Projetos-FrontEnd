import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  openMemberModal: null,
  closeMemberModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateMemberRequest: ['id', 'roles'],
  inviteMemberRequest: ['email'],
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

export const updateMember = (state, { id, roles }) => state.merge({
  data: state.data.map(member => (member.id === id ? { ...member, roles } : member)),
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBER_MODAL]: openMembersModal,
  [Types.CLOSE_MEMBER_MODAL]: closeMembersModal,
  [Types.GET_MEMBERS_SUCCESS]: membersSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
});

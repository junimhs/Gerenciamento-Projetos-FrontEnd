import { all, takeLatest } from 'redux-saga/effects';

import { signIn, signOut } from './auth';
import { AuthTypes } from '../ducks/auth';

import { getTeams, createTeam, deleteTeam } from './teams';
import { TeamsTypes } from '../ducks/teams';

import { getProjects, createProject, deleteProject } from './projects';
import { ProjectsTypes } from '../ducks/projects';

import { getMembers } from './members';
import { MembersTypes } from '../ducks/members';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(TeamsTypes.GET_TEAM_REQUEST, getTeams),
    takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeam),
    takeLatest(TeamsTypes.SELECT_TEAM, getProjects),
    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
    takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProject),
    takeLatest(ProjectsTypes.DELETE_PROJECT_REQUEST, deleteProject),
    takeLatest(TeamsTypes.DELETE_TEAM_REQUEST, deleteTeam),

    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
  ]);
}

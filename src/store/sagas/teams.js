import { call, put } from 'redux-saga/effects';
import api from '~/services/api';
import { actions as toastrActions } from 'react-redux-toastr';
import TeamsActions from '../ducks/teams';
import ProjectsActions from '~/store/ducks/projects';

export function* getTeams() {
  const response = yield call(api.get, 'teams');
  yield put(TeamsActions.getTeamSuccess(response.data));
}

export function* createTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });
    yield put(TeamsActions.createTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente!',
      }),
    );
  }
}

export function* deleteTeam({ id }) {
  try {
    yield call(api.delete, `teams/${id}`);
    yield put(TeamsActions.deleteTeamSuccess(id));
    localStorage.removeItem('@Gestao:team');
    yield put(ProjectsActions.closeModal());
    yield put(TeamsActions.closeHeader());
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente!',
      }),
    );
  }
}

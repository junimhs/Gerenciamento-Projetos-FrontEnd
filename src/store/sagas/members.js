import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import MembersActions from '../ducks/members';
import api from '~/services/api';

export function* getMembers() {
  try {
    const response = yield call(api.get, 'member');
    yield put(MembersActions.getMembersSuccess(response.data));
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

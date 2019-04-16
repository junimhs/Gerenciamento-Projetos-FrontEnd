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

export function* updateMember({ id, roles }) {
  try {
    const idAdm = JSON.parse(localStorage.getItem('@Gestao:team'));
    if (id === idAdm.id) {
      const name = roles.map(role => role.name === 'Administrador');
      if (!name[0]) {
        yield put(
          toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'Houve um erro, tente novamente!',
          }),
        );
        yield put(MembersActions.closeMemberModal());
      } else {
        yield call(api.put, `member/${id}`, { roles: roles.map(role => role.id) });
        yield put(
          toastrActions.add({
            type: 'success',
            title: 'Membro atualizado',
            message: 'O membro foi atualizado com sucesso',
          }),
        );
      }
    } else if (roles.length === 0) {
      yield put(
        toastrActions.add({
          type: 'error',
          title: 'Erro na operação',
          message: 'Houve um erro, tente novamente!',
        }),
      );
    } else {
      yield call(api.put, `member/${id}`, { roles: roles.map(role => role.id) });
      yield put(
        toastrActions.add({
          type: 'success',
          title: 'Membro atualizado',
          message: 'O membro foi atualizado com sucesso',
        }),
      );
    }
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

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Convite enviado',
        message: 'O convite foi enviado ao usuário para participar do time.',
      }),
    );
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

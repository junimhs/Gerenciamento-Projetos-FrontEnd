import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import api from '~/services/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '~/store/ducks/members';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MemberList, Invite } from './styles';

class Members extends Component {
  static propTypes = {
    closeMemberModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          user: PropTypes.shape({
            username: PropTypes.string,
          }),
          roles: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string,
            }),
          ),
        }),
      ),
    }).isRequired,
  };

  state = {
    invite: '',
    roles: [],
  };

  async componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();

    const response = await api.get('roles');
    this.setState({ roles: response.data });
  }

  handleRoleChange = (id, roles) => {
    const { updateMemberRequest } = this.props;

    updateMemberRequest(id, roles);
  };

  handleChangeInvite = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInvite = (e) => {
    e.preventDefault();

    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite);
    this.setState({ invite: '' });
  };

  render() {
    const { closeMemberModal, members } = this.props;
    const { roles, invite } = this.state;
    return (
      <Modal size="big">
        <h1>Membros</h1>
        <Invite onSubmit={this.handleInvite}>
          <input
            type="text"
            name="invite"
            placeholder="Convidar para o time"
            value={invite}
            onChange={this.handleChangeInvite}
          />
          <Button type="submit">Enviar</Button>
        </Invite>
        <form>
          <MemberList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.username}</strong>
                <Select
                  isMulti
                  options={roles}
                  value={member.roles}
                  getOptionLabel={role => role.name}
                  getOptionValue={role => role.id}
                  onChange={value => this.handleRoleChange(member.id, value)}
                />
              </li>
            ))}
          </MemberList>
          <Button onClick={closeMemberModal} filled={false} color="gray">
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);

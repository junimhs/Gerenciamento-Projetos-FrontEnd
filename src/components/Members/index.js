import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '~/store/ducks/members';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MemberList } from './styles';

class Members extends Component {
  static propTypes = {
    closeMemberModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
  };

  state = {};

  componentDidMount() {
    console.log(this.props);
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  render() {
    const { closeMemberModal, members } = this.props;
    return (
      <Modal size="big">
        <h1>Membros</h1>

        <form>
          <MemberList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>Teste</strong>
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

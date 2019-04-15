import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './styles';

const Modal = ({ children, size, confirm }) => (
  <Container>
    <Content size={size} confirm={confirm}>
      {' '}
      {children}
      {' '}
    </Content>
  </Container>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  size: PropTypes.string,
  confirm: PropTypes.bool,
};

Modal.defaultProps = {
  size: 'default',
  confirm: true,
};

export default Modal;

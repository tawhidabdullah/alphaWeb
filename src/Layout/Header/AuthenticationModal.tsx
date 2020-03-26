import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  isModalShown: boolean;
  handleModalClose: () => void;
  handleGoToLogin: () => void;
}

const AuthenticationModal = ({
  isModalShown,
  handleModalClose,
  handleGoToLogin
}: Props) => {
  return (
    <Modal show={isModalShown} onHide={handleModalClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>You are not Authenticated </Modal.Title>
      </Modal.Header>
      <Modal.Body>In Checkout any Product You have to be Logged In</Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={handleGoToLogin}
          className='fixedBoostrapButtonTobePrimaryColor'
        >
          Login
        </Button>
        <Button variant='secondary' onClick={handleModalClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthenticationModal;

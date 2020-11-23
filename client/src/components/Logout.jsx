import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { endSession } from '../redux/session';
import { logoutCurrentUser } from '../redux/auth';

/**
 * The logout button component, which also includes a confirmation modal.
 * 
 * @author Dylan Powers
 */
export default function Logout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  /**
   * Called when the user confirms the logout. This will clear the existing
   * meditation session if there is one, as well as clear all user login information
   * from our global store.
   */
  function onConfirm() {
    dispatch(endSession());
    dispatch(logoutCurrentUser());
  }

  return auth && auth.id ? (
    <div>
      <Button type="ghost" onClick={() => setIsModalVisible(true)}>Logout</Button>
      <Modal
        title="Logout"
        visible={isModalVisible}
        onOk={onConfirm}
        okText="Yes"
        onCancel={() => setIsModalVisible(false)}
        cancelText="No"
      >
        Are you sure you want to logout?
      </Modal>
    </div>
  ) : null;
}
import React from 'react';
import { Notification } from 'react-notification';

const UserNotification = (props) => {
  return (

    <Notification
      isActive={props.isActive}
      message={props.message}
      action={props.action}
      onClick={props.onClick}
    />
  );
};

export default UserNotification;

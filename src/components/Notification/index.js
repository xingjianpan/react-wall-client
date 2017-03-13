import React, { Component } from 'react';
import { Notification } from 'react-notification';

const UserNotification = (props) => {
  return (

    <Notification
      isActive={props.isActive}
      message={props.message}
      action={props.action}
      onClick={() => { console.log('clicked'); }}
    />
  );
};

export default UserNotification;

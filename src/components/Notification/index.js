import React from 'react';
import { Notification } from 'react-notification';
import { connect } from 'react-redux';

import { hideNotification } from '../../actions';

const UserNotification = (props) => {
  return (

    <Notification
      isActive={props.isActive}
      message={props.message}
      action={props.action}
      onClick={() => { props.hideNotification(); }}
    />
  );
};

const mapStateToProps = ({notifications}) => {

  const {isActive} = notifications;
  return {
    isActive,
  };
};

export default connect(mapStateToProps, { hideNotification })(UserNotification);

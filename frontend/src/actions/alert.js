import { Typography } from '@mui/material';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

import ZeplyLogger from 'utils/ZeplyLogger';

export const setAlert = (msg, type) => {
  try {
    notification.config({
      placement: 'topRight',
      top: 80,
      duration: 3
    });
    notification[type]({
      message: <Typography className="notification-message">{msg}</Typography>,
      icon: (
        <FontAwesomeIcon
          icon={type === 'success' ? faCircleCheck : faTriangleExclamation}
          style={{ color: '#fff', fontSize: '24px', fontWeight: 600 }}
        />
      ),
      className: `notification-${type}`
    });
  } catch (e) {
    ZeplyLogger(e);
  }
};

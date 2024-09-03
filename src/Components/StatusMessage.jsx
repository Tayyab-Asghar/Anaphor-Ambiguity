import React from 'react';

const StatusMessage = ({ message, type }) => {
  const classes = `mt-4 ${type === 'error' ? 'text-red-500' : 'text-green-600'}`;
  return message ? <p className={classes}>{message}</p> : null;
};

export default StatusMessage;

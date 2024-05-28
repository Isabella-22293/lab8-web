import React from 'react';
import Button from './button';

export default {
    title: 'Button',
    component: Button,
};

export const Default = () => <Button label="1" onClick={() => {}} />;

export const Warning = {
    args: {
      primary: true,
      label: 'Delete now',
      backgroundColor: 'red',
    }
  };
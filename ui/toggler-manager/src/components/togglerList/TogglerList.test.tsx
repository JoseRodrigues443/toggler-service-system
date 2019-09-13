import React from 'react';
import ReactDOM from 'react-dom';
import ToggleManager from './ToggleManager';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToggleManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});

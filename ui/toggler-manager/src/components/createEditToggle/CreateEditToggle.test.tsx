import React from 'react';
import ReactDOM from 'react-dom';
import CreateEditToggle from './CreateEditToggle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateEditToggle />, div);
  ReactDOM.unmountComponentAtNode(div);
});

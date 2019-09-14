import React from 'react';
import ReactDOM from 'react-dom';
import ToggleView from './ToggleView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToggleView />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import ToggleListView from './ToggleListView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToggleListView />, div);
  ReactDOM.unmountComponentAtNode(div);
});

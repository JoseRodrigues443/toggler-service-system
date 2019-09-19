import React from 'react';
import ReactDOM from 'react-dom';
import ServiceListView from './ServiceListView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ServiceListView />, div);
  ReactDOM.unmountComponentAtNode(div);
});

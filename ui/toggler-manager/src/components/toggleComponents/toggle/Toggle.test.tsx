import React from 'react';
import ReactDOM from 'react-dom';
import Toggler from './Toggler';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toggler toggle="isToHide" service="serviceIdentifier"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

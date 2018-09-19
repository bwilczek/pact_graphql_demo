import React from 'react';
import App from './App';
import TestRenderer from 'react-test-renderer'

it('renders without crashing', () => {
  TestRenderer.create(<App />)
});

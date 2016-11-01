import React from 'react';

const ReactHotLoader =
  __DEV__
  ? require('react-hot-loader').AppContainer
  : ({ children }) => React.Children.only(children);

export default ReactHotLoader;

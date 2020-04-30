/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import NavigationRoot from './src/navigation/NavigationRoot';
import { authenticate } from './src/APIRequests';

export const App = () => {
  authenticate();
  return <NavigationRoot />;
};

export default App;

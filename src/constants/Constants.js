import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Math.min(
  Dimensions.get('window').width,
  Dimensions.get('window').height,
);
export const SCREEN_HEIGHT = Math.max(
  Dimensions.get('window').width,
  Dimensions.get('window').height,
);

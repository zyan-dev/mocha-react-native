// Decides dynamic sizes.
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const STANDARD_WIDTH = 375;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

// Decides size based on screen size
export function dySize(size) {
  if (size === undefined) return undefined;
  return K * size;
}

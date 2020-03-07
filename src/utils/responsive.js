// Decides dynamic sizes.
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const STANDARD_WIDTH = 375;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

const USE_FOR_BIGGER_SIZE = true;

// Decides size based on screen size
export function dySize(size) {
  return K * size;
}

// Decides font size based on screen size
export function getFontSize(size) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dySize(size);
    return newSize;
  }
  return size;
}

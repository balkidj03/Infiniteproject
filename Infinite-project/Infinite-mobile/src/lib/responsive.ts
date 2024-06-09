import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const responsiveHeight = (value: number) => {
  const height = 0.13;
  return heightPercentageToDP(height * value);
};

export const responsiveWidth = (value: number) => {
  const width = 0.28;
  return widthPercentageToDP(width * value);
};

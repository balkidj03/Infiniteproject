import {extendTheme} from 'native-base';

const newColorTheme: {[key: string]: any} = {
  primary: {
    50: '#FDE4E6',
    100: '#FBC9D2',
    200: '#F4ABBF',
    300: '#E993B3',
    400: '#DB6FA2',
    500: '#BC518E',
    600: '#BC518E',
    700: '#9D377C',
    800: '#7F236A',
    900: '#69155E',
  },
};

const customFonts = {
  Montserrat: {
    100: {
      normal: 'Montserrat-Light',
      italic: 'Montserrat-LightItalic',
    },
    200: {
      normal: 'Montserrat-Light',
      italic: 'Montserrat-LightItalic',
    },
    300: {
      normal: 'Montserrat-Light',
      italic: 'Montserrat-LightItalic',
    },
    400: {
      normal: 'Montserrat-Regular',
      italic: 'Montserrat-Italic',
    },
    500: {
      normal: 'Montserrat-Medium',
    },
    600: {
      normal: 'Montserrat-Medium',
      italic: 'Montserrat-MediumItalic',
    },
    700: {
      normal: 'Montserrat-Bold',
    },
    800: {
      normal: 'Montserrat-Bold',
      italic: 'Montserrat-BoldItalic',
    },
    900: {
      normal: 'Montserrat-Bold',
      italic: 'Montserrat-BoldItalic',
    },
  },
};

export const theme = extendTheme({
  colors: newColorTheme,
  fontConfig: customFonts,
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    mono: 'Montserrat',
  },
});

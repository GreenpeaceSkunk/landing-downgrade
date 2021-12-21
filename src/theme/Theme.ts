import { ITheme } from "../types/theme";
import { pixelToRem } from 'meema.utils';

export const colorPrimaryLight = '#88E846';
export const colorPrimaryNormal = '#6ACA25';
export const colorPrimaryDark = '#4CAC07';

export const colorSecondaryLight = '#F3F6F9';
export const colorSecondaryNormal = '#C4C4C4';
export const colorSecondaryDark = '#343D46';
export const colorSecondaryExtraDark = '#2A2929';

export const colorTertiaryNormal = '#BDBDBD';

export const headingColorPrimaryNormal = '#4F4F4F';
export const headingColorSecondaryNormal = colorPrimaryDark;

export const textColorPrimaryNormal = '#4F4F4F';
export const textColorSecondaryNormal = colorPrimaryDark;


export const fontPrimaryThin = 'Font-Primary-Thin';
export const fontPrimaryLight = 'Font-Primary-Light';
export const fontPrimaryBook = 'Font-Primary-Book';
export const fontPrimaryRegular = 'Font-Primary-Regular';
export const fontPrimaryMedium = 'Font-Primary-Medium';
export const fontPrimaryBold = 'Font-Primary-Bold';

export const fontSecondaryLight = 'Font-Secondary-Light';
export const fontSecondaryBook = 'Font-Secondary-Book';
export const fontSecondaryRegular = 'Font-Secondary-Regular';
export const fontSecondaryMedium = 'Font-Secondary-Medium';
export const fontSecondaryBold = 'Font-Secondary-Bold';

const DefaultTheme: ITheme = {
  borderRadius: 5,
  color: {
    primary: {
      light: colorPrimaryLight,
      normal: colorPrimaryNormal,
      dark: colorPrimaryDark,
    },
    secondary: {
      light: colorSecondaryLight,
      normal: colorSecondaryNormal,
      dark: colorSecondaryDark,
      extraDark: colorSecondaryExtraDark,
    },
    tertiary: {
      light: '',
      normal: '#FAAF1E',
      dark: '',
    },
    success: {
      normal: '#3c763d',
    },
    warning: {},
    error: {
      normal: '#FF543E',
    },
  },
  heading: {
    color: {
      primary: {
        normal: "",
      },
      secondary: {
        normal: "",
      },
    },
  },
  text: {
    color: {
      primary: {
        normal: "#2A2929",
      },
      secondary: {
        normal: "",
      },
    },
  },
  font: {
    size: {
      _default: pixelToRem(16),
      h1: pixelToRem(30),
      h2: pixelToRem(20),
      p: pixelToRem(16),
      span: pixelToRem(16),
      button: pixelToRem(16),
    },
    family: {
      primary: {
        light: fontPrimaryLight,
        book: fontPrimaryBook,
        regular: fontPrimaryRegular,
        medium: fontPrimaryMedium,
        bold: fontPrimaryBold,
      },
      secondary: {
        light: fontSecondaryLight,
        book: fontSecondaryBook,
        regular: fontSecondaryRegular,
        medium: fontSecondaryMedium,
        bold: fontSecondaryBold,
      },
      _default: {
        h1: fontPrimaryRegular,
        h2: fontPrimaryRegular,
        h3: fontPrimaryRegular,
        h4: fontPrimaryRegular,
        h5: fontPrimaryRegular,
        h6: fontPrimaryRegular,
        div: fontPrimaryRegular,
        p: fontPrimaryRegular,
        span: fontPrimaryRegular,
        button: fontPrimaryRegular,
      }
    }
  },
  header: {
    mobile: {
      backgroundColor: 'transparent',
      height: 66,
    },
    tablet: {
      backgroundColor: 'transparent',
      height: 66,
    },
    desktop: {
      backgroundColor: 'transparent',
      height: 66,
    },
  },
  footer: {
    mobile: {
      backgroundColor: colorSecondaryExtraDark,
      height: 80,
    },
    tablet: {
      backgroundColor: colorSecondaryExtraDark,
      height: 80,
    },
    desktop: {
      backgroundColor: colorSecondaryExtraDark,
      height: 80,
    },
  },
  responsive: {
    mobile: {
      minWidth: 321,
      maxWidth: 413,
    },
    tablet: {
      minWidth: 767,
      maxWidth: 1023,
    },
    desktop: {
      minWidth: 1024,
    },
  },
};

export const LightTheme = {...DefaultTheme};
export const DarkTheme = {...DefaultTheme};

export default DefaultTheme;

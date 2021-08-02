export interface ITheme {
  borderRadius: number;
  color: {
    primary: {
      extraLight?: string;
      light?: string;
      normal?: string;
      dark?: string;
      extraDark?: string;
    };
    secondary: {
      extraLight?: string;
      light?: string;
      normal?: string;
      dark?: string;
      extraDark?: string;
    };
    tertiary: {
      extraLight?: string;
      light?: string;
      normal?: string;
      dark?: string;
      extraDark?: string;
    };
    success: {
      extraLight?: string;
      light?: string;
      normal?: string;
      dark?: string;
      extraDark?: string;
    };
    warning: {
      extraLight?: string;
      light?: string;
      normal?: string;
      dark?: string;
      extraDark?: string;
    };
    error: {
      extraLight?: string;
      light?: string;
      normal?: string;
      dark?: string;
      extraDark?: string;
    };
  };
  heading: {
    color: {
      primary: {
        extraLight?: string;
        light?: string;
        normal?: string;
        dark?: string;
        extraDark?: string;
      };
      secondary: {
        extraLight?: string;
        light?: string;
        normal?: string;
        dark?: string;
        extraDark?: string;
      };
    }
  };
  text: {
    color: {
      primary: {
        extraLight?: string;
        light?: string;
        normal?: string;
        dark?: string;
        extraDark?: string;
      };
      secondary: {
        extraLight?: string;
        light?: string;
        normal?: string;
        dark?: string;
        extraDark?: string;
      };
    }
  };
  font: {
    size: {
      _default?: string;
      h1?: string;
      h2?: string;
      p?: string;
      span?: string;
      button?: string;
    };
    family: {
      primary: {
        extraLight?: string;
        light?: string;
        thin?: string;
        book?: string;
        medium?: string;
        regular?: string;
        bold?: string;
      };
      secondary: {
        extraLight?: string;
        light?: string;
        thin?: string;
        book?: string;
        medium?: string;
        regular?: string;
        bold?: string;
      };
      _default: {
        h1?: string;
        h2?: string;
        h3?: string;
        h4?: string;
        h5?: string;
        h6?: string;
        div?: string;
        p?: string;
        span?: string;
        button?: string;
      }
    };
  };
  header: {
    mobile?: {
      backgroundColor?: string;
      height?: number;
    };
    tablet?: {
      backgroundColor?: string;
      height?: number;
    };
    desktop?: {
      backgroundColor?: string;
      height?: number;
    };
  };
  footer: {
    mobile?: {
      backgroundColor?: string;
      height?: number;
    };
    tablet?: {
      backgroundColor?: string;
      height?: number;
    };
    desktop?: {
      backgroundColor?: string;
      height?: number;
    };
  };
  responsive: {
    mobile: {
      minWidth?: number;
      maxWidth?: number;
    };
    tablet: {
      minWidth?: number;
      maxWidth?: number;
    };
    desktop: {
      minWidth?: number;
    };
  };
}

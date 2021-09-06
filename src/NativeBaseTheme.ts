/**
 * Themes related objects to be used in extending NativeBase's default theme
 */

export const NBColor = {
  // 400 is the standard shade
  secondary: {
    100: "#db838b",
    200: "#d6717a",
    300: "#d1606a",
    400: "#bd2f3c",
    500: "#b84650",
    600: "#a33e47",
    700: "#8f373e",
  },
  primary: {
    100: "#fcfcfc",
    200: "#f2eded",
    300: "#d4cfcf",
    400: "#b5b0b1",
    500: "#959192",
    600: "#686666",
    700: "#4b4949",
    800: "#2d2b2c",
    900: "#323031",
  },
  shade: {
    100: "#ebe4e5",
  },
};

export const NBFontConfig = {
  primary: {
    300: "Quicksand-Light",
    400: "Quicksand-Regular",
    500: "Quicksand-Medium",
    600: "Quicksand-SemiBold",
    700: "Quicksand-Bold",
  },
  secondary: {
    200: "Urbanist-Thin",
    300: "Urbanist-Light",
    400: "Urbanist-Regular",
    500: "Urbanist-Medium",
    600: "Urbanist-SemiBold",
    700: "Urbanist-Bold",
  },
};

export const NBFont = {
  heading: "secondary",
  body: "primary",
  mono: "primary",
};

/* Define default styles for components here */
export const NBComponents = {
  Text: {
    defaultProps: {
      fontFamily: "body",
      fontSize: 20,
    },
    // react native style prop
    baseStyle: {
      color: "secondary.300",
      fontWeight: 400,
    },
    // Custom variation for this component, set using variant prop
    variants: {
      primary: {
        color: "primary.400",
      },
      secondary: {
        color: "secondary.900",
      },
    },
  },
  Input: {
    defaultProps: {
      bg: "primary.200",
      variant: "filled",
    },
    baseStyle: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 3,
      borderRadius: 10,
      placeholderTextColor: "secondary.500",
      color: "primary.400",
      fontWeight: 500,
    },
    variants: {
      input: {
        bg: "transparent",
        border: "transparent",
        color: "secondary.200",
        placeholderTextColor: "secondary.300",
        borderBottomColor: "secondary.200",
        borderBottomWidth: 0.2,
        paddingLeft: 0,
        borderRadius: 0,
      },
      titleInput: {
        variant: "unstyled",
        bg: "transparent",
        border: "transparent",
        color: "primary.700",
        fontFamily: "Urbanist-SemiBold",
        placeholderTextColor: "primary.400",
        padding: 0,
        paddingBottom: 15,
        borderRadius: 0,
      },
      normalFill: {
        variant: "filled",
        color: "primary.700",
        padding: 3,
        borderWidth: 1,
      },
    },
  },
  Heading: {
    variants: {
      title: {
        color: "secondary.400",
        fontWeight: 500,
        fontFamily: "heading",
      },
    },
  },
  Button: {
    defaultProps: {},
    baseStyle: {
      // For some reason these doesn't work?
      // color: 'secondary.400',
      // backgroundColor: 'secondary.200'
    },
    variants: {
      default: {
        bg: "secondary.400",
        paddingX: 1.5,
        paddingY: 1,
        _text: {color: "primary.200"},
        _pressed: {bg: "secondary.500"},
      },
    },
  },
};

/**
 * Themes related objects to be used in extending NativeBase's default theme
 */

export const NBColor = {
    // 400 is the standard shade
    secondary: {
        100: '#d2646e',
        200: '#cc4e59',
        300: '#c53845',
        400: '#b01725',
        500: '#ac1f2b',
        600: '#991b26',
        700: '#861822'
    },
    primary: {
        100: '#fcfcfc',
        200: '#f2eded',
        300: '#d4cfcf',
        400: '#b5b0b1',
        500: '#959192',
        600: '#686666',
        700: '#4b4949',
        800: '#2d2b2c',
        900: '#323031'
    },
    shade: {
        100: '#ebe4e5'
    }
}

export const NBFontConfig = {
    primary: {
        300: 'Quicksand-Light',
        400: 'Quicksand-Regular',
        500: 'Quicksand-Medium',
        600: 'Quicksand-SemiBold',
        700: 'Quicksand-Bold',
    },
    secondary: {
        200: 'Urbanist-Thin',
        300: 'Urbanist-Light',
        400: 'Urbanist-Regular',
        500: 'Urbanist-Medium',
        600: 'Urbanist-SemiBold',
        700: 'Urbanist-Bold',
    },
}

export const NBFont = {
    heading: 'secondary',
    body: 'primary',
    mono: 'primary'
}

/* Define default styles for components here */
export const NBComponents = {
    Text: {
        defaultProps: {
            fontFamily: 'body',
            fontSize: 20,
        },
        // react native style prop
        baseStyle: {
            color: 'secondary.100',
            fontWeight: 400
        },
        // Custom variation for this component, set using variant prop
        variants: {
            primary: {
                color: 'primary.400'
            },
            secondary: {
                color: 'secondary.900'
            }
        }
    },
    Input:{
        defaultProps:{
            bg: 'primary.100',
            variant: "filled"
        },
        baseStyle:{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 3,
            borderRadius: 10,
            placeholderTextColor: "secondary.500",
            color: 'primary.400',
            fontWeight: 500,
        },
        variants:{
            input:{
                bg: 'transparent',
                border: 'transparent',
                color: 'secondary.200',
                placeholderTextColor: "secondary.300",
                borderBottomColor:"secondary.200",
                borderBottomWidth: 0.2,
                paddingLeft: 0,
                borderRadius: 0
            }
        }
    },
    Heading: {
        variants: {
            title: {
                color: 'secondary.200',
                fontWeight: 500,
                fontFamily: 'heading'
            }
        }
    },
    Button: {
        defaultProps: {
        },
        baseStyle: {
            // For some reason these doesn't work?
            // color: 'secondary.400',
            // backgroundColor: 'secondary.200'
        },
        variants: {
            default:{
                bg: 'secondary.200',
                paddingX: 1.5,
                paddingY: 1,
                _text: {color: 'primary.400'},
                _pressed: {bg : 'secondary.300'}
            }
        }
    }
}
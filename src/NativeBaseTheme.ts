/**
 * Themes related objects to be used in extending NativeBase's default theme
 */

export const NBColor = {
    // 400 is the standard shade
    primary: {
        100: '#e16772',
        200: '#dd515d',
        300: '#d83c49',
        400: '#d42635',
        500: '#bf2230',
        600: '#aa1e2a',
        700: '#941b25'
    },
    secondary: {
        100: '#fcfcfc',
        200: '#f2eded',
        300: '#d4cfcf',
        400: '#b5b0b1',
        500: '#959192',
        600: '#686666',
        700: '#4b4949',
        800: '#2d2b2c',
        900: '#323031'
    }
}

export const NBFontConfig = {
    primary: {
        300: 'Quicksand-Light',
        400: 'Quicksand-Regular',
        500: 'Quicksand-Medium',
        600: 'Quicksand-SemiBold',
        700: 'Quicksand-Bold',
    }
}

export const NBFont = {
    heading: 'primary',
    body: 'primary',
    mono: 'primary'
}

/* Define default styles for components here */
export const NBComponents = {
    Text: {
        defaultProps: {
            fontFamily: 'body',
            fontWeight: '500',
            fontSize: 20,
        },
        // react native style prop
        baseStyle: {
            color: 'secondary.100',
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
            fontWeight: 400,
            bg: 'secondary.200',
            variant: "filled"
        },
        baseStyle:{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 3,
            borderRadius: 10,
            placeholderTextColor: "secondary.500",
            color: 'primary.400',
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
                fontWeight: 400
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
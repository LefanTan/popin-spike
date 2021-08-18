/**
 * Themes related objects to be used in extending NativeBase's default theme
 */

export const NBColor = {
    // 400 is the standard shade
    primary: {
        100: '#ec929a',
        200: '#e46772',
        300: '#dd3c49',
        400: '#dc3745',
        500: '#c32230',
        600: '#981b25',
        700: '#6d131b'
    },
    secondary: {
        100: '#fcfcfc',
        200: '#dfdadb',
        300: '#c6c2c2',
        400: '#aea9aa',
        500: '#959192',
        900: '#323031'
    }
}

export const NBFontConfig = {
    primary: {
        300: {
            normal: 'Quicksand-Light'
        },
        400: {
            normal: 'Quicksand-Regular'
        },
        500: {
            normal: 'Quicksand-Medium'
        },
        600: {
            normal: 'Quicksand-SemiBold'
        },
        700: {
            normal: 'Quicksand-Bold'
        },
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
            fontSize: 30,
        },
        // react native style prop
        baseStyle: {
            color: 'secondary.900',
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
    }
}
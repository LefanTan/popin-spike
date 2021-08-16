/** Themes for NativeBaseProvider */

export const NBColor = {
    primary: {
        400: '#ff4f3f',
        500: '#ff4f3f'
    }
}

export const NBFontConfig = {
    Quicksand: {
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
    heading: 'Quicksand',
    body: 'Quicksand',
    mono: 'Quicksand'
}

export const NBComponents = {
    Text: {
        defaultProps:{
            fontFamily: 'body',
            fontWeight: '400',
            fontSize: 60,
            bg: '#ff4f3f'
        },
        // react native style prop
        baseStyle: {
        }
    }
}
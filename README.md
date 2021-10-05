## Spike project to test out frameworks/libraries and proof of concept.

Currently using Typescript for the project.

## Installation

1. Clone the project, and run `npm install`
2. Head to the firebase console, go to `Project Overview` -> `Project Settings` and download `google-services.json`
3. Copy the `google-services.json` to `popin-spike/android/app`
4. After finishing, run `npm start`
5. On another terminal, run `npm run android` or `npm run ios`

Note: On a mac, you might encounter permission denied error, give access your user full access to your folder with

```
sudo chown -R [username] /Users/[username]/popin-spike
```

### IOS Installation

1. Install cocoapods with `sudo gem install cocoapods`
2. `cd ios && pod install && cd ../ && react-native run-ios`

3. If you get errors, run the below steps : `xcrun -k --sdk iphoneos --show-sdk-path`
4. If the answer is `xcrun: error: SDK "iphoneos" cannot be located xcrun: error: SDK "iphoneos" cannot be located xcrun: error: unable to lookup item 'Path' in SDK 'iphoneos'`
5. Then put `sudo xcode-select --switch /Applications/Xcode.app`

### CSS Framework:

1. [Native Base](https://nativebase.io/): Also a utility framework, but it's built for react native and web.

   - [2021/08/14] npm 7 doesn't work when installing the 3.0.7 version of native base, npm 6 does.
   - Upon further use, this library isn't as useful as I thought, even though it's convenient sometimes. The docs are not well made with missing information, and some props are inconsistent.

2. [Tailwind CSS](https://tailwindcss.com/docs) (using [tailwind-react-native-classnames](https://github.com/jaredh159/tailwind-react-native-classnames)): Tailwind CSS is a utility based css framework.
   - to generate custom styles based on tailwind.config.js, run `npm run style`

### Other libraries:

1. React Navigation: for navigating between tabs

2. [React Vector Icons](https://oblador.github.io/react-native-vector-icons/) Vector Icons : free and nice icons

3. [React-Native-Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/): The current animation API locks up the JS thread and might cause a lot of lag in the future, this should be use to future proof

   - Same with PanResponder, use react-native-gesture-handler instead

4. [React-Native-Redash](https://wcandillon.gitbook.io/redash/animations): Helper library for Reanimated to reduce boilerplate code

5. [React-Native-Gesture-Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/): Gesture handler that works tightly with reanimated

6. [React Native Firebase](https://rnfirebase.io/firestore/usage) : NoSQL database solution. Uses Google's firestore

   - [Google sign in](https://github.com/react-native-google-signin/google-signin#project-setup-and-initialization)

7. [React Native Geolocation Service](https://github.com/Agontuk/react-native-geolocation-service) : Library for using google's geolocation api

8. [Responsive screen](https://github.com/marudy/react-native-responsive-screen) : Library with tools to help with creating responsive layout

9. [Image Viewer](https://github.com/ascoders/react-native-image-viewer): Library to pan and scroll through images

10. [DateTime Picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker) : Library for showing a modal for selecting date and time

11. [Material Ripple](https://www.npmjs.com/package/react-native-material-ripple): For ripple effect when clicking buttons

12. [Image Carousel](https://github.com/meliorence/react-native-snap-carousel) : for swiping through images

13. [Google Address Autocomplete](https://github.com/FaridSafi/react-native-google-places-autocomplete) : Search bar for google places

14. [React Native Settings](https://github.com/rmrs/react-native-settings): Not used.

15. [React Native Geocoding](https://github.com/marlove/react-native-geocoding) : allow access to Google's Geocoding feature

16. [React Native Image Picker](https://github.com/react-native-image-picker/react-native-image-picker) : allow for uploading of images from gallery or camera.

### Useful Snippets

```

/// Go File -> Preferences -> User Snippets -> typescriptreact.json -> paste this in
"Typescript React Function Component": {
"prefix": "rh",
"body": [
"import React from 'react'",
"",
"interface ${TM_FILENAME_BASE}Props {",
"$1",
"}",
"",
"export const $TM_FILENAME_BASE: React.FC<${TM_FILENAME_BASE}Props> = ({$2}) => {",
"\t\treturn ($3);",
"}"
],
"description": "Typescript React Function Component"
},
"React Native StyleSheet": {
"prefix": "rnss",
"body": [
"import {StyleSheet} from 'react-native'",
"const styles = StyleSheet.create({",
"",
"});"
],
"description": "React Native StyleSheet"
}

```

```

```

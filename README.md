## Spike project to test out frameworks/libraries and proof of concept.

Currently using Typescript for the project.

### CSS Framework: 
1. [Native Base](https://nativebase.io/): Also a utility framework, but it's built for react native and web. 
    - [2021/08/14] npm 7 doesn't work when installing the 3.0.7 version of native base, npm 6 does.

### Other libraries:
1. React Navigation: for navigating between tabs

2. [React Vector Icons](https://oblador.github.io/react-native-vector-icons/) Vector Icons : free and nice icons

3. [React-Native-Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/): The current animation API locks up the JS thread and might cause a lot of lag in the future, this should be use to future proof
    - Same with PanResponder, use react-native-gesture-handler instead

4. [React-Native-Redash](https://wcandillon.gitbook.io/redash/animations): Helper library for Reanimated to reduce boilerplate code

5. [React-Native-Gesture-Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/): Gesture handler that works tightly with reanimated
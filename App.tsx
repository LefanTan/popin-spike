import React from 'react';
import tw from 'tailwind-react-native-classnames';
import ctw from './tailwind-custom';
import {
  Text, View,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  return (
      // For adding new dependencies, themes etc
      <NativeBaseProvider>
        <View>
          <Text>TESTING</Text>
        </View>
      </NativeBaseProvider>
  );
};

export default App;

import React from 'react';
import tw from 'tailwind-react-native-classnames';
import ctw from './tailwind-custom';
import {
  Text, View,
} from 'react-native';

const App = () => {
  return (
    <View style={ctw`bg-off-white`}>
      <Text style={{fontSize: 20}}>Hey!</Text>
    </View>
  );
};

export default App;

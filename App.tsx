import React from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  Text, View,
} from 'react-native';

const App = () => {
  return (
    <View style={tw`bg-blue-100`}>
      <Text style={{fontSize: 20}}>Hey!</Text>
    </View>
  );
};

export default App;

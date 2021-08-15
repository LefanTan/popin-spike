import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import ctw from './tailwind-custom';
import {
  Text, Touchable, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    // For adding new dependencies, themes etc
    // <NativeBaseProvider>
    <View style={tw`bg-white flex justify-center items-center flex-1`}>
      <View style={tw`flex flex-row items-center`}>
        <Icon.Button name="facebook" backgroundColor="#96e1ff" onPress={() => setCount(count + 1)}>
          Facebook!
        </Icon.Button>
        <TouchableOpacity onPress={() => setCount(0)} style={tw`flex flex-row items-center bg-blue-200 p-1 rounded-md`}>
          <Icon name="refresh" size={20} style={tw`p-1`}/>
          <Text style={tw`text-sm`}>Refresh count!</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-4xl`}>Cool beans: {count}</Text>
    </View>
    // </NativeBaseProvider>
  );
};

export default App;

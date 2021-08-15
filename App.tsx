import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import ctw from './tailwind-custom';
import {
  Button,
  Text, Touchable, TouchableHighlight, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    // For adding new dependencies, themes etc
     <NativeBaseProvider>

    <View style={tw`bg-white flex justify-center items-center flex-1`}>
      <View style={tw`flex flex-row items-center`}>
        <TouchableHighlight onPress={() => setCount(count + 1)} underlayColor="#ff6993" activeOpacity={1} style={tw`bg-red-200 p-1 rounded-md`}>
          <Icon name="refresh" size={20} style={tw`p-1 text-white`}>
            <Text style={tw`text-sm ml-10 text-white h-full`}>Increasing count!</Text>
          </Icon>
        </TouchableHighlight>
        <TouchableOpacity onPress={() => setCount(0)} style={tw`flex flex-row items-center bg-blue-200 p-1 rounded-md`}>
          <Icon name="refresh" size={20} style={tw`p-1 text-white`} />
          <Text style={tw`text-sm text-white`}>Refresh count!</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-4xl`}>Cool beans: {count}</Text>
    </View>
     </NativeBaseProvider>
  );
};

export default App;

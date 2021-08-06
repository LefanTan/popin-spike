import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello World
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    color: 'darkslateblue',
  }
});


export default App;

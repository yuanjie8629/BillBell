import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Mybutton = (props) => {
  return (
    <View style={styles.container}>
    <View style={styles.box}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.customClick}>

        <Text style={styles.buttonText}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    width: 200,
    backgroundColor: '#f20cdb',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  box: {
    paddingVertical:10,
    justifyContent: 'center',
  },
});

export default Mybutton;
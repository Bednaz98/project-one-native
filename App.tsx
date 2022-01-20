import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConnectionSwitcher from './components/wrappers/wConnectionSwitcher';
import SuperProvider from './components/wrappers/wProviderWrapper';

export default function App() {
  return (
    <View style={styles.container}>
      <SuperProvider>
        < ConnectionSwitcher/>
      </SuperProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#045',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

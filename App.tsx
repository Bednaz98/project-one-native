import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConnectionSwitcher from './components/wrappers/wConnectionSwitcher';
import SuperProvider from './components/wrappers/wProviderWrapper';

export default function App() {
  return (
    <View style={{backgroundColor: '#444444', flex:1, alignItems:"center",justifyContent:"center" } }>
      <SuperProvider>
        <View style={{height:"auto", width:"auto", alignItems:"center",justifyContent:"center"}}>
          < ConnectionSwitcher/>
        </View>
      </SuperProvider>
      <StatusBar style="auto" />
    </View>
  );
}

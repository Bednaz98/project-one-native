import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colorScheme, GetColor } from './BasicComponents/StyleSheet';
import ConnectionSwitcher from './components/wrappers/wConnectionSwitcher';
import SuperProvider from './components/wrappers/wProviderWrapper';

export default function App() {
  //===============================================
  return (
    <View style={{backgroundColor: GetColor(colorScheme.ColorC), flex:1, alignItems:"center",justifyContent:"center" } }>
      <StatusBar style="auto" />
      <SuperProvider>
        <View style={{height:"auto", width:"auto", alignItems:"center",justifyContent:"center"}}>
          < ConnectionSwitcher/>
        </View>
      </SuperProvider>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

import db from "./db"

export default function App() {
  useEffect(()=> {
    fetch()
  },[])
  
  const fetch = async () => {
      const response = await db.collection("categories").doc("car").get()
      console.log("response", response.data())
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TextInput  } from 'react-native';
import db from "./db"
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export default function Form() {
    const [categories, setCategories] = useState([]);

    const [targetCategories, setTargetCategories] = useState()

    const [date, setDate] = useState(new Date);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [media, setMedia] = useState(null)

    useEffect(()=> {
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        db.collection("categories").onSnapshot(querySnapshot => {
            const categories = [];
            querySnapshot.forEach(doc => {
                categories.push({ label: doc.data().name, value: doc.data().name, id: doc.id });
            });
            console.log(" Current messages: ", categories);
            setCategories([...categories]);
        });
    }

    const pickMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setMedia(result.uri);
        }
    };
    const publish = async () =>{
        const get = categories.filter( object =>{
            return object.value === targetCategories
        })
        console.log('start')
        const nameWithoutSpace = name.replace(" ", "_")
        const response = await fetch(media);
        const blob = await response.blob();
        const putResult = await firebase
        .storage()
        .ref()
        .child(`${get[0].value}/${nameWithoutSpace}.mp4`)
        .put(blob);
        const url = await firebase
        .storage()
        .ref()
        .child(`${get[0].value}/${nameWithoutSpace}.mp4`)
        .getDownloadURL();
        console.log(url)
        console.log('done uploading')

        db.collection('categories').doc(get[0].id).collection('ads').add({
            name: name,
            date: date,
            number: number,
            description: description,
            location: "",
            video: url
        })
        console.log('done')
    }

  return (
    <View style={styles.container}>
        <Text>Form</Text>
        <RNPickerSelect
            onValueChange={(value) => setTargetCategories(value)}
            items={categories}
        />
        <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={setName}
            placeholder="name of place"
            value={name}
        />
        <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={setDescription}
            placeholder="description"
            value={description}
        />
        <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={setNumber}
            placeholder="number"
            value={number}
        />
        <Button title="Pick an image from camera roll" onPress={() => pickMedia()} />
        <Button title="Publish" onPress={() => publish()} />
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

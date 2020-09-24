import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native';
import ImagePicker from 'react-native-image-picker';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { getRekognition } from '../graphql/queries';
import { createDogProfile } from '../graphql/mutations';
import { Buffer } from 'buffer';

const DogCreateScreen = ({ navigation }) => {
  const [file, updateFile] = useState(null);
  const [photo, updatePhoto] = useState('');
  // Storage.configure({ level: 'protected' });

  const chooseImage = () => {
    let options = {
      title: 'Upload Dog Photo',
      takePhotoButtonTitle: 'Take a Photo',
      chooseFromLibraryButtonTitle: 'Select From Gallery',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        updateFile({
            uri: response.uri,
            data: response.data,
            name: response.fileName,
            size: response.fileSize,
            path: response.path,
            type: 'image/jpeg',
        });
        if (file) {
          console.log('no async chooseImage file.name', file.name);
        } else {
          console.log('chooseImage file is NULL');
        }
      }
    });
  }

  const validatePhoto = async (s3Key, breed) => {
    console.log('in validatePhoto s3Key ', s3Key);
    console.log('in validatePhoto breed ', breed);
    try {
          const resultData = await API.graphql(
              graphqlOperation(getRekognition, { key: s3Key, breed: breed })
          );
          const { valid } = resultData.data.getRekognition;
          if (valid) {
            console.log('getRekognition valid', valid);
          } else {
            console.log('ERROR: getRekognition invalid', valid);
          }        
          // console.log('getRekognition result', resultData.data.getRekognition.result);
      } catch (err) {
          console.log(err);
      }
  }

  const [results, setResults] = useState([]);
  const processResults = async (inputData) => {
      console.log('processResults inputData', inputData);
      try {
          const resultData = await API.graphql(
              graphqlOperation(createDogProfile, { input: inputData })
          );
          setResults(resultData.data.createDogProfile);
          navigation.navigate('DogDetail', { owner: inputData.owner, dog: inputData.dog});
      } catch (err) {
          console.log(err);
      }
  }

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    console.log('onSubmit data', data);
    // console.log('onSubmit file', file);
    var updatedData;
    let resp = await fetch(file.uri);
    let blob = await resp.blob();
    console.log('blob', blob);

    Storage.put(file.name, blob, { contentType: file.type })
      .then (result => {
        // console.log('onSubmit type', file.type);
        // console.log('onSubmit result', result);
        updatedData = {...data, ...{photokey: result.key}};
        console.log('onSubmit updated data', updatedData);
        validatePhoto(`public/${result.key}`, data.breed);
        processResults(updatedData);
      })
      .catch(err => console.log(err));

      console.log('onSubmit data', data);
  }

  const [imageKey, setImageKey] = useState("public/IMG-20200424-WA0004.jpg")


  return (
    <View style={styles.container}>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="Enter owner's email"
            value={value}
          />
        )}
        name="owner"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.owner && <Text>This is required.</Text>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="Enter dog's name"
            value={value}
          />
        )}
        name="dog"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="Enter dog's breed"
            value={value}
          />
        )}
        name="breed"
        defaultValue=""
      />
      <Button title="Upload Photo" onPress={chooseImage} />
      {file ? <Image source={{uri: file.uri}} style={{ width: 100, height: 100 }} /> : null}
      {/* <View style={styles.container}>
        <S3Image style={styles.tinyLogo} resizeMode="center" level="private" imgKey={imageKey} />
      </View> */}
      <S3Image 
        imgKey={'public/IMG_20200922_131137.jpg'}
        style={{ width: 100, height: 100 }} 
      />
      <Text>{file ? file.name : null}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    // container: {
    //     paddingTop: 5,
    //     padding: 8,
    // },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tinyLogo: {
      width: "100%",
      height: "100%",
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});

export default DogCreateScreen;
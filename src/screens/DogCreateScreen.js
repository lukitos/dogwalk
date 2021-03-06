import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import ImagePicker from 'react-native-image-picker';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { getRekognition } from '../graphql/queries';
import { createDogProfile } from '../graphql/mutations';
import { DogwalkContext } from '../context/DogwalkContext';
import { listDogProfiles } from '../graphql/queries';

const DogCreateScreen = ({ navigation }) => {
  const [file, updateFile] = useState(null);
  const [photo, updatePhoto] = useState('');
  const [email, updateEmail] = useState('');
  const [owner, updateOwner] = useState('');
  const [state, dispatch] = useContext(DogwalkContext);

  // const isBreed = false;

  useEffect(() => {
    checkUser(); 
  }, []);

  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    updateEmail(user.attributes.email);
    updateOwner(user.username);
  }
  
  const chooseImage = () => {
    // setPhotoValidation(false);
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

  const [ photoValidation, setPhotoValidation ] = useState(true);
  const validatePhoto = async (s3Key, breed, data) => {
    try {
      const resultData = await API.graphql(
          graphqlOperation(getRekognition, { key: s3Key, breed: breed })
      );
      
      const { valid, validBreed } = resultData.data.getRekognition;
      setPhotoValidation(valid);
      if (valid) {
        if (validBreed) {
          let updatedDogInput = {...data, ...{isValidBreed: 'yes'}};
          data = {...updatedDogInput}
          console.log('DogCreateScreen updatedDogInput', updatedDogInput);
        } else {
          console.log('getRekognition NOT chihuahua breed');
        }
        processResults(data);
      } else {
        console.log('ERROR: getRekognition invalid', valid);
      }
    } catch (err) {
        console.log(err);
    }
  }

  const fetchDogs = async () => {
      try {
          const dogData = await API.graphql(
              graphqlOperation(listDogProfiles, {
                  filter: { owner: { beginsWith: owner } }
              })
          );
          dispatch ({
              type: 'REFRESH',
              payload: dogData.data.listDogProfiles.items
          });
      } catch (err) {
          console.log('error occured!');
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
        fetchDogs();
        navigation.navigate('DogList', { owner: inputData.owner, dog: inputData.dog});
    } catch (err) {
        console.log(err);
    }
  }

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    console.log('onSubmit data', data);
    var updatedData;
    let resp = await fetch(file.uri);
    let blob = await resp.blob();
    console.log('blob', blob);

    Storage.put(file.name, blob, { contentType: file.type })
      .then (result => {
        updatedData = {
          ...data, 
          ...{owner: owner, photokey: result.key}
        };
        validatePhoto(`public/${result.key}`, data.breed, updatedData);
      })
      .catch(err => console.log(err));

      console.log('onSubmit data', data);
  }

  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
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
          <Input
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
      <View style={styles.photo}>
      {file ? <Image source={{uri: file.uri}} style={styles.tinyLogo} /> : null}
      <Text styles={styles.fileName}>{file ? file.name : null}</Text>
      {photoValidation ? null : <Text styles={styles.error}>Invalid Photo, Please try uploading again!</Text>}
      </View>
      <View style={styles.button}>
        <Button title="Upload Photo" onPress={chooseImage} />
        <Divider style={styles.divider} />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
      margin: 15,
    },
    divider: {
      margin: 5,
    },
    tinyLogo: {
      width: 250,
      height: 250,
      borderRadius: 20,
    },
    photo: {
      alignItems: 'center',
    },
    filename: {
      fontSize: 20,
    },
    error: {
      color: 'red',
    }
});

export default DogCreateScreen;
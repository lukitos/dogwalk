import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createJobProfile } from '../graphql/mutations';
import { listJobProfiles } from '../graphql/queries';

const JobCreate = ({ route, navigation }) => {
    const [results, setResults] = useState([]);
    const [email, updateEmail] = useState('');
    const [owner, updateOwner] = useState('');

    useEffect(() => {
      checkUser(); 
    }, []);

    async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      console.log('JobCreate username:', user.username);
      console.log('JobCreate user attributes: ', user.attributes);
      updateEmail(user.attributes.email);
      updateOwner(user.username);
    }

    const processResults = async (inputData) => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(createJobProfile, { input: inputData })
            );
            console.log('JobCreate items', resultData.data);
        } catch (err) {
            console.log(err);
        }
    }

    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const idData = {id: Math.floor(Math.random() * 256), 
          owner: owner,
          owner_email: email,
          status: 'unassigned', 
          walker: 'unassigned'};
        const inputData = {...data, ...idData};
        console.log(inputData);
        processResults(inputData);
        navigation.navigate('JobList', { owner: owner, dog: data.dog});
    }

    return (
    <View style={styles.container}>
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
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        padding: 8,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});

export default JobCreate;
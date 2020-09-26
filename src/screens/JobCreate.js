import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { API, graphqlOperation } from 'aws-amplify';
import { createJobProfile } from '../graphql/mutations';

const JobCreate = () => {
    const [results, setResults] = useState([]);
    const processResults = async (inputData) => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(createJobProfile, { input: inputData })
            );
            console.log('JobCreate items', resultData.data);
            // setResults(resultData.data.getDogProfile);
        } catch (err) {
            console.log(err);
        }
    }

    const { control, handleSubmit, errors } = useForm();
    // let id = uuidv4();F
    const onSubmit = data => {
        const idData = {id: Math.floor(Math.random() * 256), 
          owner: 'cottonlukito@gmail.com',
          status: 'unassigned', 
          walker: 'unassigned'};
        const inputData = {...data, ...idData};
        console.log(inputData);
        processResults(inputData);
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
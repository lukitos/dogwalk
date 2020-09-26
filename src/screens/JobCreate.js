import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createJobProfile } from '../graphql/mutations';
import { listJobProfiles } from '../graphql/queries';
// import { DogwalkContext } from '../context/DogwalkContext';

const JobCreate = () => {
    const [results, setResults] = useState([]);
    const [email, updateEmail] = useState('');
    const [owner, updateOwner] = useState('');
    // const [state, dispatch] = useContext(DogwalkContext);
    // const [jobs, setJobs] = useState([]);

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

    // const fetchJobs = async () => {
    //   try {
    //       const jobData = await API.graphql(
    //           graphqlOperation(listJobProfiles, {
    //               filter: { owner: { beginsWith: owner } }
    //           })
    //       );
    //       // console.log('JobListScreen jobData', jobData.data.listJobProfiles);
    //       const jobs = jobData.data.listJobProfiles.items;
    //       dispatch ({
    //           type: 'REFRESH_JOB',
    //           payload: jobData.data.listJobProfiles.items
    //       });
    //   } catch (err) {
    //       console.log(err);
    //   }
    // }

    const processResults = async (inputData) => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(createJobProfile, { input: inputData })
            );
            console.log('JobCreate items', resultData.data);
            // fetchJobs();
            // navigation.navigate('JobList', { owner: owner, dog: dog});
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
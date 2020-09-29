import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableHighlight } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useForm, Controller } from 'react-hook-form';
import { ListItem } from 'react-native-elements';
import { createJobProfile } from '../graphql/mutations';
import { queryJobProfilesByOwnerIndex, queryJobProfilesByWalkerIndex } from '../graphql/queries';
// import { onCreateJobProfile } from '../graphql/subscriptions';

const JobListScreen = ({ route, navigation }) => {
  const [count2, setCount2] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [email, updateEmail] = useState('');
  const [username, updateUserName] = useState('');

  useEffect(() => {
      console.log('**************************');
      checkUser();
      console.log("count2 changed!", count2);
  }, [count2]);
  

    async function checkUser() {
        const user = await Auth.currentAuthenticatedUser();
        // console.log('JobListScreen username:', user.username);
        // console.log('JobListScreen user attributes: ', user.attributes);

        updateEmail(user.attributes.email);
        updateUserName(user.username);

        let thename = user.username;
        // console.log('JobListScreen thename', thename);

        if (thename.includes('owner')) {
            console.log('JobListScreen - the owner');
            await fetchOwnerJobs(user.username);
            
        } else {
            console.log('JobListScreen - walker');
            await fetchWalkerJobs(user.username);
        }        
    }

  const fetchOwnerJobs = async (theOwner) => {
      console.log('JobListScreen theOwner', theOwner);
      try {
          const jobData = await API.graphql(
              graphqlOperation(queryJobProfilesByOwnerIndex, {owner: theOwner})
          );
          // console.log('JobListScreen jobData', jobData);
          // const jobs = jobData.data.queryJobProfilesByOwnerIndex.items;
            console.log('setting job state var *****:', jobData.data.queryJobProfilesByOwnerIndex.items)
            await setJobs(jobData.data.queryJobProfilesByOwnerIndex.items);
      } catch (err) {
          console.log(err);
      }
  }

  const fetchWalkerJobs = async (theWalker) => {
      try {
          const jobData = await API.graphql(
              graphqlOperation(queryJobProfilesByWalkerIndex, {walker: theWalker})
          );
          // console.log('JobListScreen jobData', jobData);
          const jobs = jobData.data.queryJobProfilesByWalkerIndex.items;
          setJobs(jobs);
      } catch (err) {
          console.log(err);
      }
  }

  const processResults = async (inputData) => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(createJobProfile, { input: inputData })
            );
        } catch (err) {
            console.log(err);
        }
    }

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setCount2(count2 + 1);
    const idData = {id: Math.floor(Math.random() * 256), 
        owner: username,
        owner_email: email,
        status: 'unassigned', 
        walker: 'unassigned'};
    const inputData = {...data, ...idData};
    console.log('onSubmit inputData', inputData);
    processResults(inputData);
  }

if (username.includes('owner')) {
    console.log('JobListScreen showAddJob');
    return (
        <View>
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
        <Button title="Post a Job" onPress={handleSubmit(onSubmit)} />
        <Text style={styles.text}>You have {jobs.length} jobs</Text>
        <FlatList 
            keyExtractor={jobs => jobs.id}
            data={jobs}
            renderItem={({item}) => {
                return (
                    <ListItem 
                        bottomDivider 
                        onPress={() => navigation.navigate('JobDetail', { id: item.id, username: username })}>
                        <ListItem.Content>
                        <ListItem.Title>{item.dog}</ListItem.Title>
                        <ListItem.Subtitle>{item.owner}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                );
            }}
        />
        </View>
    );
    } else {
        return (
            <View>
            <Text style={styles.text}>You have {jobs.length} jobs</Text>
            <FlatList 
                keyExtractor={jobs => jobs.id}
                data={jobs}
                renderItem={({item}) => {
                    return (
                        <ListItem 
                            bottomDivider 
                            onPress={() => navigation.navigate('JobDetail', { id: item.id, username: username })}>
                            <ListItem.Content>
                            <ListItem.Title>{item.dog}</ListItem.Title>
                            <ListItem.Subtitle>{item.owner}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                }}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 15,
        marginVertical: 15,
        fontSize: 20
    },
    listItem: {
        marginHorizontal: 15,
        marginVertical: 5,
        fontSize: 18
    }
});

export default JobListScreen;
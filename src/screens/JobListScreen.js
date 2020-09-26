import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { ListItem } from 'react-native-elements';
import { queryJobProfilesByOwnerIndex } from '../graphql/queries';

const JobListScreen = ({navigation}) => {
    const [jobs, setJobs] = useState([]);
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
      fetchJobs(user.username);
    }

    const fetchJobs = async (theOwner) => {
        try {
            const jobData = await API.graphql(
                graphqlOperation(queryJobProfilesByOwnerIndex, {owner: theOwner})
            );
            console.log('JobListScreen jobData', jobData);
            const jobs = jobData.data.queryJobProfilesByOwnerIndex.items;
            setJobs(jobs);
        } catch (err) {
            console.log(err);
        }
    }

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
                            onPress={() => navigation.navigate('JobDetail', { id: item.id})}>
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
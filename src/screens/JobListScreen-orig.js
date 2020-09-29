import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { ListItem } from 'react-native-elements';
import { queryJobProfilesByOwnerIndex, queryJobProfilesByWalkerIndex } from '../graphql/queries';

const JobListScreen = ({ route, navigation }) => {
    console.log('JobListScreen route', route);
    const [jobs, setJobs] = useState([]);
    const [email, updateEmail] = useState('');
    const [username, updateUserName] = useState('');

    useEffect(() => {
      checkUser(); 
    }, []);

    async function checkUser() {
        const user = await Auth.currentAuthenticatedUser();
        console.log('JobListScreen username:', user.username);
        console.log('JobListScreen user attributes: ', user.attributes);

        updateEmail(user.attributes.email);
        updateUserName(user.username);

        let thename = user.username;
        console.log('JobListScreen thename', thename);

        if (thename.includes('owner')) {
            console.log('JobListScreen - the owner');
            fetchOwnerJobs(user.username);
        } else {
            console.log('JobListScreen - walker');
            fetchWalkerJobs(user.username);
        }        
    }

    const fetchOwnerJobs = async (theOwner) => {
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

    const fetchWalkerJobs = async (theWalker) => {
        try {
            const jobData = await API.graphql(
                graphqlOperation(queryJobProfilesByWalkerIndex, {walker: theWalker})
            );
            console.log('JobListScreen jobData', jobData);
            const jobs = jobData.data.queryJobProfilesByWalkerIndex.items;
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
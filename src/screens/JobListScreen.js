import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { ListItem } from 'react-native-elements';
import { listJobProfiles } from '../graphql/queries';

const JobListScreen = ({navigation}) => {
    // console.log('JobListScreen navigation', navigation);
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const jobData = await API.graphql(
                graphqlOperation(listJobProfiles, {
                    filter: { owner: { beginsWith: "cottonlukito@gmail.com" } }
                })
            );
            // console.log('JobListScreen jobData', jobData.data.listJobProfiles);
            const jobs = jobData.data.listJobProfiles.items;
            setJobs(jobs);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

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
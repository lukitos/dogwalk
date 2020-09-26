import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import JobDetail from '../components/JobDetail';
import { getJobProfile } from '../graphql/queries';
import { sendSns } from '../graphql/queries';

const JobDetailScreen = ({ route, navigation }) => {
    const jobid = route.params.id;
    // console.log('JobDetailScreen jobid', jobid);

    const [results, setResults] = useState([]);

    const processResults = async () => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(getJobProfile, { id: jobid })
            );
            console.log('JobDetailScreen items', resultData.data.getJobProfile);
            setResults(resultData.data.getJobProfile);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        processResults();
    }, []);

    console.log('JobDetailScreen results', results);

    const startWalking = async() => {
        console.log('startWalking');
        try {
            const resultData = await API.graphql(
                graphqlOperation(sendSns, { sns_type: 'Start Walking', dog_name: results.dog, owner_email: results.owner, walker_email: results.walker })
            );
            console.log('startWalking items', resultData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View>
            <Button title="Start Walking" onPress={startWalking} />
            <JobDetail job={results} />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default JobDetailScreen;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import JobDetail from '../components/JobDetail';
import { getJobProfile } from '../graphql/queries';

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
    return (
        <JobDetail job={results} />
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default JobDetailScreen;
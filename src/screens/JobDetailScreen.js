import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import JobDetail from '../components/JobDetail';
import { getJobProfile } from '../graphql/queries';
import { sendSns } from '../graphql/queries';
import { updateJobProfile } from '../graphql/mutations';

const JobDetailScreen = ({ route, navigation }) => {
    console.log('JobDetailScreen route', route);
    const jobid = route.params.id;
    const username = route.params.username;
    console.log('JobDetailScreen jobid', jobid);
    console.log('JobDetailScreen username', username);
    const [results, setResults] = useState([]);

    useEffect(() => {
        processResults();
    }, []);

    const processResults = async () => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(getJobProfile, { id: jobid })
            );
            console.log('JobDetailScreen items', resultData.data.getJobProfile);
            setResults(resultData.data.getJobProfile);
            return resultData.data.getJobProfile;
        } catch (err) {
            console.log(err);
        }
    }

    console.log('JobDetailScreen results', results);

    const startWalking = async () => {
        const now = new Date();
        console.log('JobDetailScreen now', now);

        try {
            const resultData = await API.graphql(
                graphqlOperation(sendSns, { sns_type: 'Start Walking', dog_name: results.dog, owner_email: results.owner, walker_email: results.walker })
            );
            console.log('startWalking items', resultData);
        } catch (err) {
            console.log(err);
        }

        try {
            const resultData = await API.graphql(
                graphqlOperation(updateJobProfile, {input: { id: jobid, start_time: now }})
            );
            console.log('startWalking update resultData', resultData);
        } catch (err) {
            console.log(err);
        }
    }

    const finishWalking = () => {
        console.log('JobDetailScreen finish walking');
    }

    const showStartButton = (function() {
        let isShown = true;
        if (username.includes('owner')) {
            console.log('JobDetailScreen - owner');
            isShown = false;
        } else {
            console.log('JobDetailScreen - walker start time ', results.start_time);
            if (results) {
                if (results.start_time) {
                    isShown = false;
                }
            }
        }
        return isShown;
    })();  
    console.log('JobDetailScreen showStartButton', showStartButton);

    const showFinishButton = (function() {
        let isShown = true;
        if (username.includes('owner')) {
            console.log('JobDetailScreen showFinishButton - owner');
            isShown = false;
        } else {
            console.log('JobDetailScreen showFinishButton - walker start time ', results.start_time);
            if (results) {
                if (!results.start_time) {
                    isShown = false;
                }
            }
        }
        return isShown;
    })();  
    console.log('JobDetailScreen showFinishButton', showFinishButton);

    return (
        <View>
            {showStartButton ? <Button title="Start Walking" onPress={startWalking} /> : null}
            {showFinishButton ? <Button title="Finish Walking" onPress={finishWalking} /> : null}
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
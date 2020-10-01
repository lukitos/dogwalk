import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Divider } from 'react-native-elements';
// import Geolocation from '@react-native-community/geolocation';
import { API, graphqlOperation } from 'aws-amplify';
import JobDetail from '../components/JobDetail';
import { getJobProfile } from '../graphql/queries';
import { sendSns } from '../graphql/queries';
import { updateJobProfile } from '../graphql/mutations';

const JobDetailScreen = ({ route, navigation }) => {
    // console.log('JobDetailScreen route', route);
    const jobid = route.params.id;
    const username = route.params.username;
    console.log('JobDetailScreen jobid', jobid);
    console.log('JobDetailScreen username', username);

    const [results, setResults] = useState([]);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    useEffect(() => {
        processResults();
    }, []);

    const processResults = async () => {
        // Geolocation.getCurrentPosition(info => console.log('JobDetailScreen Geolocation info', info));
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
        console.log('JobDetailScreen startWalking now', now);

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
            navigation.navigate('JobList', { id: jobid, username: username })
        } catch (err) {
            console.log(err);
        }
    }

    const finishWalking = async () => {
        const now = new Date();
        console.log('JobDetailScreen finishWalking now', now);

        try {
            const resultData = await API.graphql(
                graphqlOperation(sendSns, { sns_type: 'Finish Walking', dog_name: results.dog, owner_email: results.owner, walker_email: results.walker })
            );
            console.log('finishWalking items', resultData);
        } catch (err) {
            console.log(err);
        }

        try {
            const resultData = await API.graphql(
                graphqlOperation(updateJobProfile, {input: { id: jobid, end_time: now }})
            );
            // console.log('finishWalking update resultData', resultData);
            navigation.navigate('JobList', { id: jobid, username: username });
        } catch (err) {
            console.log(err);
        }
    }

    const showMap = () => {
        console.log('showMap');
        navigation.navigate('JobMap');
        // navigation.navigate('DogSuccess');
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

    const showMapButton = (function() {
        let isShown = false;
        if (username.includes('owner')) {
            isShown = true;
        }
        return isShown;
    })();
    console.log('JobDetailScreen showMapButton', showMapButton);

    return (
        <View style={styles.container}>
            <JobDetail job={results} />
            <Divider style={styles.divider} />
            {showStartButton ? <Button title="Start Walking" onPress={startWalking} /> : null}
            {showFinishButton ? <Button title="Finish Walking" onPress={finishWalking} /> : null}
            {showMapButton ? <Button title="Where is My Dog?" onPress={showMap} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    text: {
        fontSize: 30
    },
    divider: {
      margin: 5,
    },
});

export default JobDetailScreen;
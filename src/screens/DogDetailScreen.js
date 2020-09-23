import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import DogDetail from '../components/DogDetail';
import { getDogProfile } from '../graphql/queries';

const DogDetailScreen = ({ route, navigation }) => {
    console.log('DogDetailScreen route.params', route.params);
    const { owner, dog } = route.params;
    // const owner = 'Owner1@gmail.com';
    // const dog = 'Dog1';
    const [results, setResults] = useState([]);

    const processResults = async () => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(getDogProfile, { owner: owner, dog: dog })
            );
            console.log('DogDetailScreen items', resultData.data.getDogProfile);
            setResults(resultData.data.getDogProfile);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        processResults();
    }, []);

    console.log('DogDetailScreen result', results);
    return (
        <DogDetail dog={results} />
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default DogDetailScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobDetail = (props) => {
    const { id, 
        owner,
        walker,
        dog,
        geo_url,
        start_time,
        end_time,
        status,
        distance } = props.job;

    return (
        <View>
            <Text>Job ID: {id}</Text>
            <Text>Dog: {dog}</Text>
            <Text>Owner: {owner}</Text>
            <Text>Walker: {walker}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default JobDetail;
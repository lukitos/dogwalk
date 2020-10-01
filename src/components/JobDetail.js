import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

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
            <Text style={styles.title}>{dog}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Job ID: {id}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Dog: {dog}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Owner: {owner}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Walker: {walker}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Start Time: {start_time}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>End Time: {end_time}</Text>
            <Divider style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#707070',
    },
    divider: {
      margin: 10,
    },
    label: {
        fontSize: 18,
        color: '#A5A5A5',
    },
    text: {
        fontSize: 18,
        color: '#707070',
    },
});

export default JobDetail;
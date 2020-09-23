import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DogDetail = (props) => {
    console.log('DogDetail props', props);
    const { owner,
        walker,
        dog } = props.dog;

    return (
        <View>
            <Text>Dog: {dog}</Text>
            <Text>Owner: {owner}</Text>
            <Text>Walker: {walker}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default DogDetail;
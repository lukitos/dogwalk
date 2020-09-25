import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Storage } from 'aws-amplify';

const DogDetail = (props) => {
    console.log('DogDetail props', props);

    const { owner,
        dog,
        breed,
        photokey } = props.dog;
    
    const [photoURI, setPhotoURI] = useState(null);

    // console.log('DogDetail Photokey', photokey);
    Storage.get(photokey)
    .then( result => {
        // console.log('DogDetail Storage.get result', result);
        setPhotoURI(result);
    })

    return (
        <View>
            {photoURI ? <Image source={{uri: photoURI}} style={{ width: 100, height: 100 }} /> : null}
            <Text>Dog: {dog}</Text>
            <Text>Owner: {owner}</Text>
            <Text>Breed: {breed}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default DogDetail;
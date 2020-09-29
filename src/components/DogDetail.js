import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Storage } from 'aws-amplify';
import DogOffer from './DogOffer';

const DogDetail = (props) => {
    console.log('DogDetail props', props);

    const { owner,
        dog,
        breed,
        isValidBreed,
        photokey } = props.dog;
    
    const [photoURI, setPhotoURI] = useState(null);

    // console.log('DogDetail Photokey', photokey);
    Storage.get(photokey)
    .then( result => {
        // console.log('DogDetail Storage.get result', result);
        setPhotoURI(result);
    })

    const showOffer = (function() {
        let isShown = false;

        if (isValidBreed === 'yes') {
            isShown = true;
        }
        
        return isShown;
    })();  

    return (
        <View>
            {photoURI ? <Image source={{uri: photoURI}} style={{ width: 100, height: 100 }} /> : null}
            <Text>Dog: {dog}</Text>
            <Text>Owner: {owner}</Text>
            <Text>Breed: {breed}</Text>
            {showOffer ? <DogOffer /> : null}
        </View>
    );
}

const styles = StyleSheet.create({});

export default DogDetail;
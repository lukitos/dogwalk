import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { Storage } from 'aws-amplify';
import DogOffer from './DogOffer';

const CloudFrontURL = 'https://d1f7qvsflutek2.cloudfront.net/public';

const DogDetail = (props) => {
    console.log('DogDetail props', props);

    const { owner,
        dog,
        breed,
        isValidBreed,
        photokey } = props.dog;
    
    // const [photoURI, setPhotoURI] = useState(null);

    // console.log('DogDetail Photokey', photokey);
    // Storage.get(photokey)
    // .then( result => {
    //     // console.log('DogDetail Storage.get result', result);
    //     setPhotoURI(result);
    // })
    let photoURI = `${CloudFrontURL}/${photokey}`;

    const showOffer = (function() {
        let isShown = false;

        if (isValidBreed === 'yes') {
            isShown = true;
        }
        
        return isShown;
    })();  

    return (
        <View style={styles.container}>
            {photoURI ? <Image source={{uri: photoURI}} style={styles.tinyLogo} /> : null}
            <Text style={styles.title}>{dog}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Owner:</Text>
            <Text style={styles.text}>{owner}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.label}>Breed:</Text>
            <Text style={styles.text}>{breed}</Text>
            {/* {showOffer ? <DogOffer /> : null} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        alignItems: 'center',
    },
    divider: {
      margin: 5,
    },
    tinyLogo: {
      width: 250,
      height: 250,
      borderRadius: 20,
    },
    title: {
        fontSize: 30,
        color: '#707070',
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

export default DogDetail;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { Auth } from 'aws-amplify';

const walkerPhoto = 'https://d1f7qvsflutek2.cloudfront.net/public/walker1.png';

const WalkerHomeScreen = ({ route, navigation }) => {
    // const [owner, updateOwner] = useState('');

    async function signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    // useEffect(() => {
    //     checkUser(); 
    //     updateOwner(user.username);
    // }, []);

    // async function checkUser() {
    //     const user = await Auth.currentAuthenticatedUser();
    // }
    
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.text}>Welcome</Text>
            <Text style={styles.ownerText}>cottonlukito+walker</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: walkerPhoto }} style={styles.image} />
            </View>
            <Button
                title='Sign Out'
                onPress={signOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 15,
    },
    imageContainer: {
        margin: 15,
    },
    image: {
        width: 375,
        height: 375,
    },
    text: {
        fontSize: 30,
    },
});

export default WalkerHomeScreen;
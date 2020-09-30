import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Image, Card } from 'react-native-elements';
import { Auth } from 'aws-amplify';

const OwnerHomeScreen = (props) => {
    console.log('OwnerHomeScreen props', props);
    const ownerPhoto = 'https://d1f7qvsflutek2.cloudfront.net/public/owner1.png';

    const [owner, updateOwner] = useState('');

    async function signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    useEffect(() => {
        checkUser(); 
        updateOwner(user.username);
    }, []);

    async function checkUser() {
        const user = await Auth.currentAuthenticatedUser();
    }

    return (
        <View>
            <Button
                title='Sign Out'
                onPress={signOut} />
            <Text style={styles.text}>Welcome {owner}</Text>
            <Card>
            <Card.Title>CARD WITH DIVIDER</Card.Title>
                <Card.Divider/>
                        <View>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: ownerPhoto }}
                        />
                        <Text style={styles.name}>{owner}</Text>
                        </View>
            </Card>
        </View>
    );
}

export default OwnerHomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    image: {
        width: 100,
        height: 100
    }
});
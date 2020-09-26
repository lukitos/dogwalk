import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

const OwnerHomeScreen = (props) => {
    console.log('OwnerHomeScreen props', props);

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
        </View>
    );
}

export default OwnerHomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});
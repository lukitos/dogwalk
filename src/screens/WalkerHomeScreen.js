import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Auth } from 'aws-amplify';

const WalkerHomeScreen = ({ route, navigation }) => {
    console.log('WalkerHomeScreen route', route);
    async function signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    
    return (
        <View>
            <Button
                title='Sign Out'
                onPress={signOut} />
            <Text style={styles.text}>Home - Dog Walker</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default WalkerHomeScreen;
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Auth } from 'aws-amplify';

const OwnerHomeScreen = ({navigation}) => {
    async function signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    console.log('OwnerHomeScreen Auth', Auth);

    return (
        <View>
            <Text>Welcome </Text>
            <Button
                title='Sign Out'
                onPress={signOut} />
        </View>
    );
}
export default OwnerHomeScreen;
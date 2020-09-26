import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

const OwnerHomeScreen = (props) => {
    console.log('OwnerHomeScreen props', props);
    // const [currUser, updateCurrUser] = useState('');
    // const currUser = null;
    async function signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    useEffect(() => {
        checkUser(); 
    });

    async function checkUser() {
        const user = await Auth.currentAuthenticatedUser();
        // console.log('OwnerHomeScreen user:', user);
        // console.log('OwnerHomeScreen user attributes: ', user.attributes);
        // updateCurrUser(user);
        // currUser = user.username;
        // let AWS = require('aws-sdk');

        // AWS.config.update({
        //     region: 'us-east-1',
        //     credentials: new AWS.CognitoIdentityCredentials({
        //         IdentityPoolId: 'us-east-1:451f68e6-2a76-4bbf-aedf-f2d68f50c9de'
        //     })
        // });

        // let cognitoISP = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });

        // function updateUserAttribute(name, value, username, userPoolId){
        //     console.log('updateUserAttribute');
        //     return new Promise((resolve, reject) => {
        //         let params = {
        //             UserAttributes: [
        //                 {
        //                     Name: 'type',     // name of attribute
        //                     Value: 'owner'    // the new attribute value
        //                 }
        //             ],
        //             UserPoolId: 'us-east-1_2fYw9CvQB',
        //             Username: 'shusia'
        //         };

        //         cognitoISP.adminUpdateUserAttributes(params, (err, data) => err ? reject(err) : resolve(data));
        //     });
        // }

        // updateUserAttribute('type', 'owner', 'shusia', 'us-east-1_2fYw9CvQB')
        /* 
        admin-update-user-attributes
        --user-pool-id us-east-1_2fYw9CvQB
        --username shusia
        --user-attributes Name="type",Value="owner"
        */


    }

    return (
        <View>
            <Button
                title='Sign Out'
                onPress={signOut} />
            <Text style={styles.text}>Home - Dog Owner</Text>
        </View>
    );
}

export default OwnerHomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});
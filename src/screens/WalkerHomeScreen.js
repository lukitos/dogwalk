import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const WalkerHomeScreen = ({navigation}) => {
    return (
        <View>
            <Text style={styles.text}>Home - Dog Walker</Text>
            <Button
                title="Go to Job Profiles"
                onPress={() => navigation.navigate('JobList')}
            ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default WalkerHomeScreen;
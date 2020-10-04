import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

const offerImage = 'https://d1f7qvsflutek2.cloudfront.net/public/qrcode.png';

const CoffeeOffer = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Starbucks is on your route!</Text>
            <Text style={styles.label}>Stop by and earn Octank Pets points when you buy coffee, food, or other merchandise.</Text>
            <Text style={styles.label}>Starbucks at 1 Main St.</Text>
            <Divider style={styles.divider} />
            <Image source={{uri: offerImage}} style={{ width: 300, height: 300 }} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#A5A5A5',
  },
  TextStyle: {
    color: '#E91E63',
    textDecorationLine: 'underline'
  },
  divider: {
    margin: 15,
  },
});

export default CoffeeOffer;
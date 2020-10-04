import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Linking } from 'react-native';
import { Divider } from 'react-native-elements';

const offerImage = 'https://images-na.ssl-images-amazon.com/images/I/61KL4OFQfPL._AC_SL1500_.jpg';
const offerURI = 'https://www.amazon.com/Lophipets-Striped-Chihuahua-Clothes-Vest-Yellow/dp/B08CB291JV/ref=sr_1_7?crid=13TWQ0IHQE0AZ&dchild=1&keywords=chihuahua+clothing&qid=1601388546&s=pet-supplies&sprefix=chihua%2Cpets%2C195&sr=1-7';

const DogOffer = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>This outfit loooks really cute on me, can you buy me one?</Text>
            <Text style={styles.TextStyle} onPress={ () => Linking.openURL(offerURI) } >Click Here To Buy</Text>
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
    margin: 5,
  },
});

export default DogOffer;
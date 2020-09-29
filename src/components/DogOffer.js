import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Linking } from 'react-native';

const offerImage = 'https://images-na.ssl-images-amazon.com/images/I/61KL4OFQfPL._AC_SL1500_.jpg';
const offerURI = 'https://www.amazon.com/Lophipets-Striped-Chihuahua-Clothes-Vest-Yellow/dp/B08CB291JV/ref=sr_1_7?crid=13TWQ0IHQE0AZ&dchild=1&keywords=chihuahua+clothing&qid=1601388546&s=pet-supplies&sprefix=chihua%2Cpets%2C195&sr=1-7';

const DogOffer = ({ route, navigation }) => {
    return (
        <View>
            <Text>This outfit loooks really cute on me, can you buy me one?</Text>
            <Text style={styles.TextStyle} onPress={ () => Linking.openURL(offerURI) } >Click Here To Buy</Text>
            <Image source={{uri: offerImage}} style={{ width: 300, height: 300 }} />
        </View>
    );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
 
  TextStyle: {
 
    color: '#E91E63',
    textDecorationLine: 'underline'
 
  }
});

export default DogOffer;
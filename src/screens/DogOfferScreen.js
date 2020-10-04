import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import DogOffer from '../components/DogOffer';
import CoffeeOffer from '../components/CoffeeOffer';

const DogOfferScreen = ({ route, navigation }) => {
    const offers = [
        {
            id: '1',
            title: "Coffee",
            subTitle: 'Earn Octank Pets points when you spend at Starbucks',
            key: 'CoffeeOffer'
        },
        {
            id: '2',
            title: 'Dog sweaters',
            subTitle: 'Winter is almost here. Keep your fur babies warm!',
            key: 'DogOffer'
        }
    ];

    return (
        <View style={styles.containerStyle}>
        <FlatList 
            keyExtractor={offers => offers.id}
            data={offers}
            renderItem={({item}) => {
                return (
                    <ListItem 
                        bottomDivider 
                        onPress={() => navigation.navigate(item.key)}>
                        <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                );
            }}
        />
        </View>
    );
}
const styles = StyleSheet.create({
    containerStyle: {
        marginHorizontal: 15,
        marginVertical: 15,
    },
    textStyle: {
        marginHorizontal: 15,
        marginVertical: 15,
        fontSize: 20
    },
    listItem: {
        marginHorizontal: 15,
        marginVertical: 5,
        fontSize: 18
    }
});

export default DogOfferScreen;
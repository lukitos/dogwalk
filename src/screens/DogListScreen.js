import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { ListItem, Button } from 'react-native-elements';
import { listDogProfiles } from '../graphql/queries';
import { DogwalkContext } from '../context/DogwalkContext';

const DogListScreen = ({route, navigation}) => {
    const [state, dispatch] = useContext(DogwalkContext);

    console.log('before fetchDogs');

    const fetchDogs = async () => {
        console.log('fetchDogs')
        try {
            const dogData = await API.graphql(graphqlOperation(listDogProfiles));
            console.log('dogData', dogData.data.listDogProfiles.items);
            dispatch ({
                type: 'REFRESH',
                payload: dogData.data.listDogProfiles.items
            });
        } catch (err) {
            console.log('error occured!');
            console.log(err);
        }
    }

    useEffect(() => {
        fetchDogs();
    }, []);

    console.log('state', state);

    return (
        <View>
            <Button 
                title="Create Dog Profile"
                onPress={() => navigation.navigate('DogCreate')} />
            <Text style={styles.textStyle}>You have {state.dogs.length} dogs</Text>
            <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={state.dogs}
                renderItem={({item}) => {
                    return (
                        <ListItem 
                            bottomDivider 
                            onPress={() => navigation.navigate('DogDetail', { owner: item.owner, dog: item.dog})}>
                            <ListItem.Content>
                            <ListItem.Title>{item.dog}</ListItem.Title>
                            <ListItem.Subtitle>{item.owner}</ListItem.Subtitle>
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

export default DogListScreen;
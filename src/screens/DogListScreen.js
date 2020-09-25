import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { ListItem, Button } from 'react-native-elements';
import { listDogProfiles } from '../graphql/queries';

const DogListScreen = ({route, navigation}) => {
    console.log('DogListScreen route params', route.params);

    const [dogs, setDogs] = useState([]);
    // console.log('DogListScrren dogs', dogs);
    // let dogs = [];

    const fetchDogs = async () => {
        console.log('fetchDogs')
        try {
            const dogData = await API.graphql(graphqlOperation(listDogProfiles));
            console.log('dogData', dogData.data.listDogProfiles.items);
            setDogs(dogData.data.listDogProfiles.items);
            // dogs = dogData.data.listDogProfiles.items;
            // console.log('dogData', dogData);
        } catch (err) {
            console.log('error occured!');
            console.log(err);
        }
    }

    useEffect(() => {
        fetchDogs();
    }, []);

    // useEffect(() => {
    //     fetchDogs();
    // });

    return (
        <View>
            <Button 
                title="Create Dog Profile"
                onPress={() => navigation.navigate('DogCreate')} />
            <Text style={styles.textStyle}>You have {dogs.length} dogs</Text>
            <FlatList 
                keyExtractor={dogs => dogs.dog}
                data={dogs}
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
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableHighlight } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useForm, Controller } from 'react-hook-form';
import { ListItem } from 'react-native-elements';
import { createJobProfile } from '../graphql/mutations';
import { queryJobProfilesByOwnerIndex, queryJobProfilesByWalkerIndex } from '../graphql/queries';
import { onCreateJobProfile } from '../graphql/subscriptions';

class JobListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            email: '',
            username: ''
        }
    }

    componentDidMount() {
        checkUser(); 
    }

    async function checkUser() {
        const user = await Auth.currentAuthenticatedUser();
        // console.log('JobListScreen username:', user.username);
        // console.log('JobListScreen user attributes: ', user.attributes);

        console.log('**************************');
        this.setState({ email: user.attributes.email});
        this.setState({ username: user.username });

        let thename = user.username;
        // console.log('JobListScreen thename', thename);

        if (thename.includes('owner')) {
            // console.log('JobListScreen - the owner');
            await fetchOwnerJobs(user.username);
            
        } else {
            console.log('JobListScreen - walker');
            await fetchWalkerJobs(user.username);
        }        
    }

    const fetchOwnerJobs = async (theOwner) => {
        console.log('JobListScreen theOwner', theOwner);
        try {
            const jobData = await API.graphql(
                graphqlOperation(queryJobProfilesByOwnerIndex, {owner: theOwner})
            );
            // console.log('JobListScreen jobData', jobData);
            const jobs = jobData.data.queryJobProfilesByOwnerIndex.items;
            await setJobs(jobs);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchWalkerJobs = async (theWalker) => {
        try {
            const jobData = await API.graphql(
                graphqlOperation(queryJobProfilesByWalkerIndex, {walker: theWalker})
            );
            // console.log('JobListScreen jobData', jobData);
            const jobs = jobData.data.queryJobProfilesByWalkerIndex.items;
            setJobs(jobs);
        } catch (err) {
            console.log(err);
        }
    }

    const processResults = async (inputData) => {
        try {
            const resultData = await API.graphql(
                graphqlOperation(createJobProfile, { input: inputData })
            );
            console.log('JobCreate items', resultData.data);
        } catch (err) {
            console.log(err);
        }
    }

    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const idData = {id: Math.floor(Math.random() * 256), 
          owner: username,
          owner_email: email,
          status: 'unassigned', 
          walker: 'unassigned'};
        const inputData = {...data, ...idData};
        console.log('onSubmit inputData', inputData);
        setInput(input + 1);
        console.log('onSubmit input', input);
        processResults(inputData);
    }

    render() {
        console.log('rendering');

        return (
            <Text>Test</Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
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

export default JobListScreen;
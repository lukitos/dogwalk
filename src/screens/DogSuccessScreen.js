import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const DogSuccessScreen = ({ route, navigation }) => {
    const [seconds, setSeconds] = useState(0);
    const [runTimes, setRunTimes] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {            

            if (runTimes < 10)
            {
                console.log('Inside IF');
                setSeconds(seconds => seconds + 1);
                console.log('Run Times:', runTimes)
                setRunTimes(runTimes => runTimes + 1); 
            }
            else {
                console.log('Inside ELSE');
                return () => clearInterval(interval);
            }
            }, 1000);
        return () => clearInterval(interval);
    }, [runTimes, seconds]);

    return (
        <Text>
        {runTimes} execution
        {seconds} seconds have elapsed since mounting.
        </Text>
    );
}

export default DogSuccessScreen;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Polyline } from "react-native-maps";

const JobMapScreen = ({ route, navigation }) => {
    // console.log('JobMapScreen route', route);
    const [index, setIndex] = useState(2);
    const [polylinePath, setPolylinePath] = useState([]);

    // Fedex
    const [Berlin, setBerlin] = useState({
        longitude: -97.743160,
        latitude: 30.266166, 
    }); 

    // Gold Gym
    const [Franfurt, setFranfurt] = useState({
        longitude: -97.741765,
        latitude: 30.267760, 
    });

    // Starbucks
    const [austinChild, setAustinChild] = useState({
      latitude: 30.268465, 
      longitude: -97.742903,
    });

    // Roaring Form
    const [park1, setPark1] = useState({
      latitude: 30.269317, 
      longitude: -97.742130
    });

    // Perry Steakhouse
    const [park2, setPark2] = useState({
      latitude: 30.269586, 
      longitude: -97.743493
    });

    const fullPath = [Berlin, austinChild, park1, park2, Franfurt];

    useEffect(() => {

      const interval = setInterval(() => {      

        if (polylinePath.length < fullPath.length) {
          console.log('***************');
          console.log('Index before', index);

          const polylinePathLocal = [
              ...fullPath.slice(0, index)
          ];   
          console.log('Local polyline', polylinePathLocal);         
          setPolylinePath(polylinePathLocal);
          setIndex(index + 1);  

          console.log('Index after', index);
          console.log('AnimatingPolylineComponent polylinePath', polylinePath);
          console.log('polylinpath length:', polylinePath.length); 
          console.log('fullpath length:', fullPath.length);
        } else {
          //setPolylinePath({polylinePath: []});
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);

    }, [index, polylinePath]);

    return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.268659, 
          longitude: -97.742699,
          latitudeDelta: 0.00222,
          longitudeDelta: 0.00221
        }}
      >
      <Polyline 
        coordinates={polylinePath} 
        strokeColor={'#f00'}
        strokeWidth={6}
      />
      </MapView>
    </>
    );

    // return (
    //   <Text>blah</Text>
    // );
}

export default JobMapScreen;
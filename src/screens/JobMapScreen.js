import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Polyline } from "react-native-maps";

const JobMapScreen = ({ route, navigation }) => {
    console.log('JobMapScreen route', route);

    // 2222 Vet
    const [Berlin, setBerlin] = useState({
        longitude: -97.845191,
        latitude: 30.393351
    }); 

    // ACF
    const [Franfurt, setFranfurt] = useState({
        longitude: -97.847237,
        latitude: 30.387081
    });

    return (
    <>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.395093,
          longitude: -97.827884,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Polyline 
          coordinates={[Berlin, Franfurt]} 
          strokeColor={'#f00'}
          strokeWidth={6}
        />
      </MapView>
    </>
    );
}

export default JobMapScreen;
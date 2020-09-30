import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Polyline } from "react-native-maps";

const JobMapScreen = ({ route, navigation }) => {
    // console.log('JobMapScreen route', route);
    const [index, setIndex] = useState(2);
    const [polylinePath, setPolylinePath] = useState([]);

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

    // Children of Austin
    const [austinChild, setAustinChild] = useState({
      latitude: 30.390791, 
      longitude: -97.846902
    });

    // Park 1
    const [park1, setPark1] = useState({
      latitude: 30.391790, 
      longitude: -97.847369
    });

    // Park 2
    const [park2, setPark2] = useState({
      latitude: 30.392845, 
      longitude: -97.846296
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

    //   return (
    //   );
    // }

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
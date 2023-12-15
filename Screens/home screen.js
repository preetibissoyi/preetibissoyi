import React, { useMemo, useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView,PermissionsAndroid } from 'react-native';

import MapView, { Marker, Polyline } from "react-native-maps";
import BottomSheet from '@gorhom/bottom-sheet';

const HomeScreen = ({ navigation }) => {
  const snapPoints = useMemo(() => [ '50%', '70%'], []);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleChooseVehicle = () => {
    // Handle the action when choosing a vehicle
    navigation.navigate('ChooseVehicle');
  };
  const handleLocationSearch = (isFromLocation) => {
    // Navigate to the search screen with the parameter indicating if it's for "From" location
    navigation.navigate('LocationSearch', { isFromLocation });
  };

  const [region, setRegion] = useState({
    latitude: 37.7749, // default latitude (for example, San Francisco)
    longitude: -122.4194, // default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);

  // Function to get user's current location
  const getUserLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRegion({
              ...region,
              latitude,
              longitude,
            });
          },
          (error) => console.log(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
       <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))}
        {/* You can add Polyline component here for drawing a route if needed */}
      </MapView>
    <BottomSheet index={1} snapPoints={snapPoints}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.text1}>Where are you going today?</Text>
          <TextInput
            style={styles.input}
            placeholder="From"
            placeholderTextColor="grey"
            value={fromLocation}
            onChangeText={setFromLocation}
            onPress={() => handleLocationSearch(true)} // Navigate to search screen for "From" location
          />
          <TextInput
            style={styles.input}
            placeholder="To"
            placeholderTextColor="grey"
            value={toLocation}
            onChangeText={setToLocation}
            onPress={() => handleLocationSearch(false)} // Navigate to search screen for "To" location
          />
        </View>

        <Text style={styles.recentPlacesText}>Recent Places</Text>
        {/* Display your recent places here */}
        {/* Replace the following with your logic to display recent places */}
        <View style={styles.recentPlacesContainer}>
          <Text style={styles.recentPlace}>Recent Place 1</Text>
          <Text style={styles.recentPlace}>Recent Place 2</Text>
          <Text style={styles.recentPlace}>Recent Place 3</Text>
        </View>
      </ScrollView>

      {/* Choose a Vehicle Button */}
      <Pressable style={styles.chooseVehicleButton} onPress={handleChooseVehicle}>
        <Text style={styles.chooseVehicleButtonText}>Choose a Vehicle</Text>
      </Pressable>
    </BottomSheet>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
    },
    text1: {
      color: '#EE272E',
      fontWeight: '600',
      fontSize: 20,
      marginBottom: 20,
    },
    input: {
      height: 60,
      marginVertical: 8,
      borderWidth: 1,
      paddingHorizontal: 20,
      borderRadius: 40,
      borderColor: 'grey',
      color: 'black',
      fontSize: 18,
      fontWeight: '400',
    },
    chooseVehicleButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    chooseVehicleButton: {
      backgroundColor: '#EE272E',
      paddingVertical: 16,
      margin:20,
      borderRadius: 30,
      alignItems: 'center',
      marginVertical: 16,
    },
    recentPlacesText: {
      fontSize: 18,
      fontWeight: '400',
      marginBottom: 10,
    },
    recentPlacesContainer: {
      marginBottom: 20,
    },
    recentPlace: {
      fontSize: 16,
      marginBottom: 8,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'space-between', // Align items with space between them
      padding: 20,
    },
  });
  
  export default HomeScreen;
  
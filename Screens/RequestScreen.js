import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const COLORS = {
  primary: '#EE272E',
  title: 'white',
  grey: 'grey',
};

const SIZES = {
  h2: 24,
};

const RideRequestScreen = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [othersReason, setOthersReason] = useState('');

  const handleCancelBooking = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleReasonSelect = (reason) => {
    const isSelected = selectedReasons.some((r) => r.id === reason.id);
    if (isSelected) {
      const updatedReasons = selectedReasons.filter((r) => r.id !== reason.id);
      setSelectedReasons(updatedReasons);
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleConfirmCancellation = () => {
    console.log('Booking cancelled with reasons:', selectedReasons);
    if (othersReason) {
      console.log('Other reason:', othersReason);
    }
    setModalVisible(false);
    setSelectedReasons([]);
    setOthersReason('');
  };

  // Function to render cancellation reasons
  const renderReasons = () => {
    const reasons = [
      { id: 1, name: 'Waiting for a long time' },
      { id: 2, name: 'Unable to contact driver' },
      { id: 3, name: 'Driver denied to come pickup' },
      { id: 4, name: 'Wrong address shown' },
      { id: 5, name: 'The price is not reasonable' },
     
    ];

    return reasons.map((reason) => (
      <TouchableOpacity
        key={reason.id}
        style={{
          height: reason.id === 6 ? 100 : 70, // Adjusted height for "Others" with additional reason
          borderRadius: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: 300,
          margin: 10,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => handleReasonSelect(reason)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {selectedReasons.some((r) => r.id === reason.id) ? (
            <FontAwesome name="check-square" size={20} color="red" />
          ) : (
            <FontAwesome name="square" size={20} color="grey" />
          )}
          <Text style={{ color: selectedReasons.some((r) => r.id === reason.id) ? 'black' : 'black', fontSize: 14, marginLeft: 10 }}>
            {reason.name}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.circle}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FontAwesome name="user-circle" size={30} color="#EE272E" style={styles.circularIcon} />
      </View>

      {/* Request Bar */}
      <View style={styles.requestBar}>
        {/* Pickup Location Input */}
        <View style={[styles.inputContainer, styles.locationInputContainer, { backgroundColor: 'white' }]}>
          <FontAwesome name="circle" size={20} color="red" style={styles.locationIcon} />
          <Text style={[styles.inputLabel, { fontSize: 18 }]}>Pickup Location</Text>
          <TextInput
            style={[styles.input, { color: 'black', fontSize: 16 }]}
            placeholder="Enter Pickup Location"
            value={pickupLocation}
            onChangeText={(text) => setPickupLocation(text)}
          />
          <FontAwesome name="map-marker" size={20} color="#EE272E" style={styles.targetIcon} />
        </View>

        <View style={{ height: 16 }} />

        {/* Destination Input */}
        <View style={[styles.inputContainer, styles.locationInputContainer, { backgroundColor: 'white' }]}>
          <FontAwesome name="circle" size={20} color="green" style={styles.locationIcon} />
          <Text style={[styles.inputLabel, { fontSize: 18 }]}>Destination Location</Text>
          <TextInput
            style={[styles.input, { color: 'black', fontSize: 16 }]}
            placeholder="Enter Destination"
            value={destination}
            onChangeText={(text) => setDestination(text)}
          />
          <FontAwesome name="map-marker" size={20} color="#4CAF50" style={styles.targetIcon} />
        </View>
      </View>

      {/* Confirmation Text and Cancel Booking Button */}
      <View style={styles.confirmationContainer}>
        <View style={styles.confirmationBox}>
          <Text style={[styles.confirmationText, { fontSize: 10 }]}>Waiting for driver's confirmation...</Text>
          <TouchableOpacity style={styles.cancelBookingButton} onPress={handleCancelBooking}>
            <Text style={[styles.buttonText, { fontSize: 18 }]}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Cross Mark Button to Go Back */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" marginLeft={250} size={30} color={COLORS.grey} />
            </TouchableOpacity>
            <Text style={{ color: COLORS.primary, fontSize: 20, marginVertical: 18, fontFamily: 'Sans Serif', textAlign: 'center' }}>
              Want to cancel your booking?
            </Text>
            {/* Render cancellation reasons */}
            {renderReasons()}
            <View style={{ marginBottom: 20 }}>
              {/* "Other" Field as a TextInput */}
              <TextInput
                style={{
                  height: 90,
                  borderColor: 'grey', // Border color for the "Other" field
                  borderWidth: 1,
                  width:300,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginBottom: -20,
                  alignItems: 'center',
                }}
                placeholder="Other"
                value={othersReason}
                onChangeText={(text) => setOthersReason(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: selectedReasons.length > 0 || othersReason ? 'red' : COLORS.primary,
                borderColor: 'red',
                height: 60,
                borderWidth: 1,
                width: 300,
                borderRadius: 100,
                paddingVertical: 10,
                paddingHorizontal: 20,
                margin: 20,
              }}
              onPress={handleConfirmCancellation}
            >
              <Text style={{ color: COLORS.title, textAlign: 'center', fontSize: SIZES.h2 }}>Cancel Booking</Text>
            </TouchableOpacity>
            <Text>Just Now</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'lightgrey'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 26,
    alignItems: 'center', 
    backgroundColor: 'white', 
  },
  circularIcon: {
    color: 'black',
    padding: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestBar: {
    flex: 1,
    marginLeft: 11,
    marginTop: 16,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  locationInputContainer: {
    paddingLeft: 8,
    marginBottom: 0,
  },
  inputLabel: {
    marginLeft: 8,
    color: 'black',
  },
  input: {
    height: 50, 
    flex: 1,
  },
  locationIcon: {
    marginRight: 8,
  },
  targetIcon: {
    marginLeft: 8,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    
  },
  confirmationBox: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: 90,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  confirmationText: {
    color: 'black',
  },
  cancelBookingButton: {
    marginTop: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 8,
    backgroundColor: '#EE272E',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmCancellationButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
});

export default RideRequestScreen;

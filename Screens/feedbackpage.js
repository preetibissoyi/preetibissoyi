import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
const ViewPropTypes = View.propTypes || ViewPropTypes;

const FeedbackScreen = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancelBooking = () => {
    console.log('Booking cancelled.');
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    console.log('Rating:', rating);

    // Add logic to send feedback and rating to the server or database

    // Show the Thank You modal
    setModalVisible(true);
  };

  const closeModal = () => {
    // Close the modal and navigate to the home screen or perform any other action
    setModalVisible(false);
    console.log('Navigate to home');
  };

  const handleStarRatingPress = (rating) => {
    console.log('Selected Rating:', rating);
    setRating(rating);
  };
  

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {/* Circular Icon for Menu (Now on the left side) */}
        <TouchableOpacity style={styles.circularIcon}>
          <Ionicons name="menu-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* Circular Icon for Image (Now on the right side) */}
        <FontAwesome name="user-circle" size={30} marginLeft={40} />
      </View>

      {/* Request Bar */}
      <View style={styles.requestBar}>
        {/* Pickup Location Input */}
        <View style={[styles.inputContainer, styles.locationInputContainer, { backgroundColor: 'white' }]}>
          <FontAwesome name="circle" size={20} color="#EE272E" style={styles.locationIcon} />
          <Text style={[styles.inputLabel, { fontSize: 18 }]}>Pickup Location</Text>
          <TextInput
            style={[styles.input, { color: 'black', fontSize: 16 }]}
            value={pickupLocation}
            onChangeText={(text) => setPickupLocation(text)}
          />
          <FontAwesome name="map-marker" size={20} color="#EE272E" style={styles.targetIcon} />
        </View>

        {/* Add Space Between Input Fields */}
        <View style={{ height: 16 }} />

        {/* Destination Input */}
        <View style={[styles.inputContainer, styles.locationInputContainer, { backgroundColor: 'white' }]}>
          <FontAwesome name="circle" size={20} color="green" style={styles.locationIcon} />
          <Text style={[styles.inputLabel, { fontSize: 18 }]}>Destination Location</Text>
          <TextInput
            style={[styles.input, { color: 'black', fontSize: 16 }]}
            value={destination}
            onChangeText={(text) => setDestination(text)}
          />
          <FontAwesome name="map-marker" size={20} color="#4CAF50" style={styles.targetIcon} />
        </View>
      </View>

      {/* Confirmation Text and Feedback Section */}
      <View style={styles.confirmationContainer}>
        <View style={styles.confirmationBox}>
          {/* Driver Image, Name, and Rating Section */}
          <View style={styles.driverInfoContainer}>
            <Image source={require('../assets/driverimage.png')} style={styles.driverImage} />
            <TouchableOpacity>
              <Ionicons name="mail-outline" size={24} color="#EE272E" marginLeft={320} marginBottom={-90} />
            </TouchableOpacity>
            <Text style={styles.driverName}>Barbara</Text>
            <View style={styles.driverAdditionalInfo}>
              <FontAwesome name="star" size={18} color="#FFD700" style={styles.driverIcon} />
              <Text style={styles.driverText}>4.8</Text>
            </View>
          </View>

          {/* Add spacing between text and rating */}
          <View style={{ marginTop: 10 }}>
            {/* How is your trip with EzTruck Text */}
            <Text>How is your trip with EzTruck</Text>
          </View>
          <TouchableOpacity onPress={() => handleStarRatingPress(rating)}>
  <StarRating
    disabled={false}
    maxStars={5}
    rating={rating}
    starSize={25}
    fullStarColor="#FFD700"
    selectedStar={handleStarRatingPress}
    starSpacing={20}
   
  />
</TouchableOpacity>
          {/* Feedback Input */}
          <TextInput
            style={styles.feedbackInput}
            multiline
            placeholder="Enter your feedback..."
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
          />

          {/* Submit Feedback Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Thank You Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Add an Image component with the source from your assets */}
            <Image source={require('../assets/thanku.png')} style={styles.modalImage} />

            <Text style={styles.modalText}>Thank You!</Text>
            <Text>Your feedback has been submitted. We appreciate your input!</Text>

            <TouchableHighlight style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Home</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 26,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  circularIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE272E', // You can adjust the color as needed
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
  driverInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  driverImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginBottom: -80,
    marginRight: 250,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  driverAdditionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  driverIcon: {
    marginRight: 5,
  },
  driverText: {
    fontSize: 16,
  },
  feedbackInput: {
    height: 90,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
    textAlign:'center' ,
   // marginBottom:''
  },
  submitButton: {
    backgroundColor: '#EE272E',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
    width:350,
    alignSelf: 'center', 
    //marginBottom:''
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
   textAlign:'center',
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
    textAlign:'center',
  },
  closeButton: {
    backgroundColor: '#EE272E',
    padding: 10,
    borderRadius: 20,
    width:350,
    marginTop: 10,
   
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
  },
  modalImage: {
    width: 100, 
    height: 100, 
    marginBottom: 10,
  },
});


export default FeedbackScreen;
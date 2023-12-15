import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');

  const handlePayment = () => {
    if (selectedPaymentMethod === 'online') {
      console.log('Paying online...');
    } else if (selectedPaymentMethod === 'wallet') {
      console.log('Paying with wallet...');
    } else if (selectedPaymentMethod === 'cash') {
      console.log('Paying with cash...');
    } else {
      console.log('Please select a payment method.');
      return;
    }

    setSelectedPaymentMethod(null);
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.circle}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={35} color="white" marginBottom={-10} />
          </TouchableOpacity>
        </View>
        <FontAwesome name="user-circle" size={30} color="white" style={styles.circularIcon} marginBottom={-10}/>
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

      {/* Payment Method Box */}
      <View style={styles.paymentMethodBox}>
        <Text style={styles.title}>Select Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'online' && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedPaymentMethod('online')}
        >
          <View style={styles.checkBox}>
            {selectedPaymentMethod === 'online' && (
              <Icon name="check" size={20} color="white" />
            )}
          </View>
          <Icon name="credit-card" size={30} color="red" />
          <Text style={styles.paymentText}>Pay Online</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'wallet' && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedPaymentMethod('wallet')}
        >
          <View style={styles.checkBox}>
            {selectedPaymentMethod === 'wallet' && (
              <Icon name="check" size={20} color="green" />
            )}
          </View>
          <Icon name="account-balance-wallet" size={30} color="red" />
          <Text style={styles.paymentText}>Pay with Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'cash' && styles.selectedPaymentMethod,
          ]}
          onPress={() => setSelectedPaymentMethod('cash')}
        >
          <View style={styles.checkBox}>
            {selectedPaymentMethod === 'cash' && (
              <Icon name="check" size={20} color="green" />
            )}
          </View>
          <Icon name="attach-money" size={40} color="#EE272E" />
          <Text style={styles.paymentText}>Pay with Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EE272E',
    width: '100%',
    marginBottom:30,
  },
  circularIcon: {
    marginRight: 10,
  },
  requestBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  locationInputContainer: {
    borderColor: 'lightgrey',
    height:50,
    borderWidth: 1,

  },
  locationIcon: {
    marginRight: 10,
  },
  inputLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
  },
  targetIcon: {
    marginLeft: 'auto',
  },
  paymentMethodBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethod: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#EE272E',
    borderRadius: 50,
    width: 350,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'mistyrose',
  },
  paymentText: {
    marginLeft: 10,
    color: 'black',
    textAlign: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#EE272E',
    padding: 15,
    width:350,
    borderRadius: 20,
    marginTop: 30,
    marginBottom:20,
    height:50,
   
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
     fontSize:16,
   
  },
  
});

export default PaymentScreen;


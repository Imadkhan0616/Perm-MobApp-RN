import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateAttendanceRequest() {
  const navigation = useNavigation();
  const [attRequestData, setAttRequestData] = useState({
    attendanceRequestID:'',
      businessPartnerID:'',
      fromDate: new Date().toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
      halfDay:'Click to Select',
      reason:''
  });

  const [showHalfdayPicker, setShowHalfdayPicker] = useState(false);
  


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

 

  const handleCreateAttendanceRequest = async () => {
    if (!isValidEmployeeId(attRequestData.businessPartnerID)) {
      alert('Please enter a valid Employee Code.');
      return;
    }
  
    if (!isValidDate(attRequestData.fromDate)) {
      alert('Please select a valid Date.');
      return;
    }
  
    try {
      const response = await axios.post('https://646296267a9eead6fad2c898.mockapi.io/api/V1/Attendance', attRequestData);
  
      if (response.ok) {
        alert('Request for Attendance created successfully!');
        navigation.navigate('Attendance');
      } else {
        console.log('Error creating attendance Request');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  const isValidEmployeeId = (businessPartnerID) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(businessPartnerID);
  };
  
  const isValidDate = (fromDate) => {
    return true;
  };

  return (
<ScrollView>
   <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: '#f4f5ff', marginTop:-150, paddingVertical:100 }}>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Request for Attendance</Text></View>
        <View style={styles.inputContainer}>
  <Text style={styles.label}>Employee Code</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Employee Code"
    value={attRequestData.businessPartnerID}
    onChangeText={(text) => setAttRequestData({ ...attRequestData, businessPartnerID: text })}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>From Date</Text>
  <DateTimePicker
    value={new Date(attRequestData.fromDate)} 
    
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      setAttRequestData({ ...attRequestData, fromDate: formattedDate });
    }}
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>To Date</Text>
  <DateTimePicker
    value={new Date(attRequestData.toDate)} 
    
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      setAttRequestData({ ...attRequestData, toDate: formattedDate });
    }}
  />
</View>

 <View style={styles.inputContainer}>
              <Text style={styles.label}>Half Day</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setShowHalfdayPicker(true)}
              >
                <Text style={styles.pickerText}>{attRequestData.halfDay}</Text>
              </TouchableOpacity>
              {showHalfdayPicker && (
                <Picker
                  selectedValue={attRequestData.halfDay}
                  onValueChange={(itemValue, itemIndex) => {
                    setAttRequestData({ ...attRequestData, halfDay: itemValue });
                    setShowHalfdayPicker(false);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />

                </Picker>
              )}
            </View>

            <View style={styles.inputContainer}>
  <Text style={styles.label}>Reason</Text>
  <TextInput
    style={styles.input}
    placeholder="Give Reason"
    value={attRequestData.reason}
    onChangeText={(text) => setAttRequestData({ ...attRequestData, reason: text })}
    keyboardType="text"
  />
</View>


<TouchableOpacity onPress={handleCreateAttendanceRequest} style={styles.submitButton}>
  <Text style={styles.submitButtonText}>Create</Text>
</TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback></ScrollView>
  );
}

const styles = StyleSheet.create({
  smallPicker: {
    height: 190, 
    width: '100%', 
    backgroundColor: '#ededed',
    borderRadius: 8,
    marginBottom: 10,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingTop:25,
    backgroundColor:'white',
    borderRadius:'25'
  ,    paddingLeft:10

  },
  heading:{
    fontWeight:'bold',    fontSize: 20,
    marginBottom: 16,
    marginLeft:70,
    marginTop:20,
    textAlign:'center',
    color:'white',
    backgroundColor:'#0a1f2e',

  },
  titleContainer:{
    backgroundColor:'#0a1f2e',
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    width:'150%',
    
      },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft:3
  },
  input: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom:10
  },
  submitButton: {
    marginHorizontal: 20,
    backgroundColor: '#0a1f2e',
    paddingVertical: 12,
    borderRadius: 20,
    width:100,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
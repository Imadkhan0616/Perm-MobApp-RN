import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateAttendance() {
  const navigation = useNavigation();
  const [attendanceData, setAttendanceData] = useState({
    businessPartnerID: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Select',
    shift: 'Select',
    lateentry: 'Select',
    earlyexit: 'Select',
  });

  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showShiftPicker, setShowShiftPicker] = useState(false);
  const [showlateentryPicker, setShowlateentryPicker] = useState(false);
  const [showearlyexitPicker, setShowearlyexitPicker] = useState(false);


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

 

  const handleCreateAttendance = async () => {
    if (!isValidEmployeeId(attendanceData.businessPartnerID)) {
      alert('Please enter a valid Employee ID.');
      return;
    }
  
    if (!isValidDate(attendanceData.date)) {
      alert('Please select a valid Date.');
      return;
    }
  
    try {
      const response = await axios.post('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/AttendanceMark', attendanceData);
  
      if (response.ok) {
        alert('Attendance created successfully!');
        navigation.navigate('Attendance');
      } else {
        console.log('Error creating attendance');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  const isValidEmployeeId = (businessPartnerID) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(businessPartnerID);
  };
  
  const isValidDate = (date) => {
    return true;
  };

  return (
<ScrollView>
   <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: '#f4f5ff', marginTop:-150, paddingVertical:100 }}>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Mark Attendance</Text></View>
        <View style={styles.inputContainer}>
  <Text style={styles.label}>Employee Code</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Employee Code"
    value={attendanceData.businessPartnerID}
    onChangeText={(text) => setAttendanceData({ ...attendanceData, businessPartnerID: text })}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Date</Text>
  <DateTimePicker
    value={new Date(attendanceData.date)} 
    
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      setAttendanceData({ ...attendanceData, date: formattedDate });
    }}
  />
</View>
 {/* Status Picker */}
 <View style={styles.inputContainer}>
              <Text style={styles.label}>Status</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setShowStatusPicker(true)}
              >
                <Text style={styles.pickerText}>{attendanceData.status}</Text>
              </TouchableOpacity>
              {showStatusPicker && (
                <Picker
                  selectedValue={attendanceData.status}
                  onValueChange={(itemValue, itemIndex) => {
                    setAttendanceData({ ...attendanceData, status: itemValue });
                    setShowStatusPicker(false);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Present" value="Present" />
                  <Picker.Item label="Leave" value="Leave" />
                  <Picker.Item label="Sick-leave" value="Sick-leave" />
                  <Picker.Item label="On-duty" value="On-duty" />
                </Picker>
              )}
            </View>

            {/* Shift Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Shift</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setShowShiftPicker(true)}
              >
                <Text style={styles.pickerText}>{attendanceData.shift}</Text>
              </TouchableOpacity>
              {showShiftPicker && (
                <Picker
                  selectedValue={attendanceData.shift}
                  onValueChange={(itemValue, itemIndex) => {
                    setAttendanceData({ ...attendanceData, shift: itemValue });
                    setShowShiftPicker(false);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Morning" value="Morning" />
                  <Picker.Item label="Evening" value="Evening" />
                </Picker>
              )}
            </View>

            {/* Late Entry Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Late Entry</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setShowlateentryPicker(true)}
              >
                <Text style={styles.pickerText}>{attendanceData.lateentry}</Text>
              </TouchableOpacity>
              {showlateentryPicker && (
                <Picker
                  selectedValue={attendanceData.lateentry}
                  onValueChange={(itemValue, itemIndex) => {
                    setAttendanceData({ ...attendanceData, lateentry: itemValue });
                    setShowlateentryPicker(false);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              )}
            </View>

            {/* Early Exit Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Early Exit</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setShowearlyexitPicker(true)}
              >
                <Text style={styles.pickerText}>{attendanceData.earlyexit}</Text>
              </TouchableOpacity>
              {showearlyexitPicker && (
                <Picker
                  selectedValue={attendanceData.earlyexit}
                  onValueChange={(itemValue, itemIndex) => {
                    setAttendanceData({ ...attendanceData, earlyexit: itemValue });
                    setShowearlyexitPicker(false);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              )}
</View>

<TouchableOpacity onPress={handleCreateAttendance} style={styles.submitButton}>
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
    marginLeft:85,
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
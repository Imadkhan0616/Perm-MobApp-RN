import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateTask() {
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState({
    taskID:'',
                  code:'',
                  paramTaskTypeID:'',
                  paramTaskPriorityID:'',
                  paramTaskStatusID:'',
                  taskName:'',
                  taskDescription:'',
                  isActive:'Select',
                  deadline: new Date().toISOString().split('T')[0],
                  targetCompletionDate: new Date().toISOString().split('T')[0],
                  assignedby:'',
                  assignedto:''

  });

  const [showStatusPicker, setShowStatusPicker] = useState(false);
  


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const isValidTaskId = (taskID) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(taskID);
  };
  
  const isValidDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
  
    if (selectedDate <= currentDate) {
      return false;
    }
  
    return true;
  };
  
  const isValidTargetCompletionDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
  
    if (selectedDate <= currentDate) {
      return false;
    }
  
    return true;
  };
  
  const handleCreateTask = async () => {
    if (!isValidTaskId(taskData.taskID)) {
      alert('Please enter a valid Task ID.');
      return;
    }
  
    if (!isValidDate(taskData.deadline)) {
      alert('Please select a valid Deadline.');
      return;
    }
  
    if (!isValidTargetCompletionDate(taskData.targetCompletionDate)) {
      alert('Please select a valid Target Completion Date.');
      return;
    }
    if (!taskData.taskName.trim()) {
        alert('Please enter a Task Name.');
        return;
      }
    
      if (!taskData.assignedto.trim()) {
        alert('Please enter Id of the assigned employee.');
        return;
      }
    
    try {
      const response = await axios.post('https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/Task', taskData);
  
      if (response.ok) {
        alert('Task created successfully!');
        
        navigation.navigate('Task');
      } else {
        console.log('Error creating Task');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
 

  return (
<ScrollView>
   <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: '#f4f5ff', marginTop:-150, paddingVertical:100 }}>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Create Task</Text></View>

          <View style={styles.inputContainer}>
  <Text style={styles.label}>Task ID</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Task Id."
    value={taskData.taskID}
    onChangeText={(text) => setTaskData({ ...taskData, taskID: text })}
    keyboardType="numeric"
  />
</View>

        <View style={styles.inputContainer}>
  <Text style={styles.label}>Code</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Code"
    value={taskData.code}
    onChangeText={(text) => setTaskData({ ...taskData, code: text })}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Task Type ID</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Id."
    value={taskData.paramTaskTypeID}
    onChangeText={(text) => setTaskData({ ...taskData, paramTaskTypeID: text })}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Task Priority ID</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Id."
    value={taskData.paramTaskPriorityID}
    onChangeText={(text) => setTaskData({ ...taskData, paramTaskPriorityID: text })}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Task Status ID</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Id."
    value={taskData.paramTaskStatusID}
    onChangeText={(text) => setTaskData({ ...taskData, paramTaskStatusID: text })}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Task Name</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Task Name"
    value={taskData.taskName}
    onChangeText={(text) => setTaskData({ ...taskData, taskName: text })}
    keyboardType="text"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Description</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Description"
    value={taskData.taskDescription}
    onChangeText={(text) => setTaskData({ ...taskData, taskDescription: text })}
    keyboardType="text"
  />
</View>

<View style={styles.inputContainer}>
              <Text style={styles.label}>Is Active</Text>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setShowStatusPicker(true)}
              >
                <Text style={styles.pickerText}>{taskData.isActive}</Text>
              </TouchableOpacity>
              {showStatusPicker && (
                <Picker
                  selectedValue={taskData.isActive}
                  onValueChange={(itemValue, itemIndex) => {
                    setTaskData({ ...taskData, isActive: itemValue });
                    setShowStatusPicker(false);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              )}
            </View>


<View style={styles.inputContainer}>
  <Text style={styles.label}>Deadline</Text>
  <DateTimePicker
    value={new Date(taskData.deadline)} 
    
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      setTaskData({ ...taskData, deadline: formattedDate });
    }}
  /></View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Target Completion Date</Text>
  <DateTimePicker
    value={new Date(taskData.targetCompletionDate)} 
    
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      setTaskData({ ...taskData, targetCompletionDate: formattedDate });
    }}
  />
</View>
<View style={styles.inputContainer}>
  <Text style={styles.label}>Assigned To</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Employee Id."
    value={taskData.assignedto}
    onChangeText={(text) => setTaskData({ ...taskData, assignedto: text })}
    keyboardType="numeric"
  />
</View>
<View style={styles.inputContainer}>
  <Text style={styles.label}>Assigned By</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Manager Id."
    value={taskData.assignedby}
    onChangeText={(text) => setTaskData({ ...taskData, assignedby: text })}
    keyboardType="numeric"
  />
</View>

 
<TouchableOpacity onPress={handleCreateTask} style={styles.submitButton}>
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
    marginLeft:115,
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
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Modal, Picker, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import qs from 'qs';

const HomeScreen = ({ navigation }) => {

    let [showModal, setShowModal] = useState(false)
    let [selectValue, setSelectValue] = useState('Select Your Choice')
    let [showLoading, setShowLoading] = useState(false)

    let handleSubject = (value) => {
        setShowLoading(true)
        let data = {
            subject: value
        }

        axios.post('http://192.168.1.76:3500/showQues',qs.stringify(data)).then((response) => {
            console.log("response from query ::: ",response.data)
        setShowLoading(false)
            navigation.navigate(value, {
                apiData:response.data
            })
        }).catch((error) => {
            console.log("something went wrong !!! ",error);
            Alert.alert("Something went wrong !!")
        })
    }

    return(
        <View style={{marginVertical:20, marginHorizontal:20}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {showLoading ? <Modal
            animationType='fade'
            transparent={false}
            visible={showLoading}
            presentationStyle='fullScreen'
            >
                <View style={{marginVertical:300, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size="large" />
                <Text style={{fontSize:22, color:'#999999'}}>Loading ....</Text>
                </View>
                </Modal> : null}
            </View>
        <View>
            <Text style={{fontSize:20}}>Press the button below to continue to the MCQ section.</Text>
            <View style={{marginVertical:10,marginTop:40}}>
                <TouchableOpacity onPress={() => setShowModal(true)} style={{
                height:40,justifyContent: 'center', alignItems: 'center',borderRadius:8,borderWidth:1,
                borderColor:'limegreen'
                }}>
                    <Text style={{color:'limegreen',fontSize:20}}>{selectValue}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            presentationStyle='pageSheet'
        >
            <View style={{flex:1}}>
                <View style={{justifyContent: 'flex-end',alignItems: 'flex-end',marginVertical:15,marginHorizontal:20}}>
                    <TouchableOpacity onPress={() => setShowModal(false)}>
                        <Text style={{fontSize:20, color:'dodgerblue'}}>Done</Text>
                    </TouchableOpacity>
                </View>
                <Picker selectedValue={selectValue} onValueChange={(value) => setSelectValue(value)}>
                <Picker.Item label="Select Your Choice" value="Select Your Choice"  />
                    <Picker.Item label="English" value="English"  />
                    <Picker.Item label="GK" value="GK" />
                    <Picker.Item label="Reasoning" value="Reasoning" />
                </Picker>
            </View>
        </Modal>
        <View style={{marginVertical:10}}>
                <TouchableOpacity onPress={() => handleSubject(selectValue)} style={{
                height:40,justifyContent: 'center', alignItems: 'center',borderRadius:8,borderWidth:1,
                borderColor:'dodgerblue'
                }}>
                    <Text style={{color:'dodgerblue',fontSize:20}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen
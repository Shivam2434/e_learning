import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable, FlatList } from 'react-native'
import _ from 'lodash'


const English = ({ route, navigation }) => {

    let [ques, SetQues] = useState([])
    let [optns, setOptns] = useState([])
    const [next, setNext] = useState(0);
    const [lastQues, setLastQues] = useState(false);
    const [firstQues, setFirstQues] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    let { apiData } = route.params;
    // console.log("Api data from home page :: ",apiData)
    
    let test_arr = [];
    for(let opt of optns){
        if(!test_arr.includes(opt.q_id)){
            test_arr.push(opt.q_id)
        }
    }
    let test_arr_2 = [];
    for(let question_id of test_arr){
        let options = [];
        for(let opt of optns){
            if(opt.q_id == question_id){
                options.push({
                    option_id : opt.option_id,
                    lable: opt.options,
                    value: opt.options
                })
            }
        }
        test_arr_2.push({
            question_id: question_id,
            options: options
        })
    }

    console.log("gregegregegre :: ",test_arr_2)

    const Item = ({ item, onPress, backgroundColor, textColor, borderColor, borderWidth }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor, borderWidth, borderColor]}>
          <Text style={[styles.title, textColor]}>{item}</Text>
        </TouchableOpacity>
      );

    const renderItem = ({ item }) => {
        const backgroundColor = item.option_id === selectedId ? "#F0F8FF" : "white";
        const color = item.option_id === selectedId ? 'black' : 'black';
        const borderColor = item.option_id === selectedId ? 'dodgerblue' : 'none';
        const borderWidth = item.option_id === selectedId ? 1 : 0; 
    
        return (
          <Item
            item={item.value}
            onPress={() => setSelectedId(item.option_id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
            borderColor={{ borderColor }}
            borderWidth={{ borderWidth }}
          />
        );
      };


    let ques_here = test_arr_2.map((item,index) => {
        if(item.question_id === 1){
            console.log(item.options[0])
        }
        return(
            apiData.question.map((val,i) => {
                if(val.q_id === item.question_id){
                    return(
                    <View key={index} style={styles.view2}>
                     <Text key={index} style={styles.quesText}>Q{index + 1}. {val.question}</Text>
                     <FlatList
                        data={item.options}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.q_id}
                        extraData={selectedId}
                    />
                </View>
                    )
                }
            })
        )
    })


    // let data_here = _.groupBy(optns, 'q_id')
    // let data_test_here = _.mapValues(data_here, function(o) { 
    //     for(let i=0; i < optns.length; i++) {
    //         return {
    //             label: o[i].options,
    //             options_id: o[i].option_id
    //         };
    //     }
    //  });
     
    //  let test_arr = [];

    //  for(let o of data_here){
    //     for(let i=0; i < optns.length; i++) {
    //         test_arr.push({
    //             label: o[i].options,
    //             options_id: o[i].option_id
    //         });
    //     }
    //  } 

    //  let arr_test_here = [data_test_here]

    // let next_ques = () => {
        
    //     let max_length = ques.length;
    //     if(next > max_length){
    //         // setLastQues(true);
    //     }
    //     else{
    //         setNext(next + 1);
    //         // setFirstQues(false);
    //     }
    // }

    // let prev_ques = () => {
        
    //     if(next <= 0){
    //         // setFirstQues(true);
    //     }
    //     else{
    //         setNext(next - 1);
    //         // setLastQues(false);
    //     }
    // }


    
    useEffect(() => {
        SetQues(apiData.questions)
        setOptns(apiData.options)
    },[])
    console.log("questions array :: ",apiData.options)
    // console.log("questions in state :: ",ques)
    // console.log("options in state :: ",optns)

    return(
        <ScrollView style={styles.mainContainer}>
            <View>
        <Text style={styles.headingDirection}>Directions</Text>
            </View>
            <View style={styles.view1}>
                <Text style={styles.directionText}>1. Attempt all questions.</Text>
                <Text style={styles.directionText}>2. Following are the mcq type questions.</Text>
                <Text style={styles.directionText}>3. Select one of the 4 options.</Text>
            </View>
            <View style={styles.bisect}></View>
                
                    {ques_here}

            <View style={styles.bisect}></View>
            <View style={styles.view3}>
            <Pressable style={styles.submit}>
                    <Text style={styles.submitText}>Submit Answers</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        marginVertical:15,
        marginHorizontal:12
    },  
    view1:{
        marginVertical:5
    },
    view2:{
        padding:7, 
        marginVertical:5
    },
    view3:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:20,
        marginBottom:50,
    },
    headingDirection:{
        fontSize:25,
        fontWeight:'bold'
    },
    directionText:{
        fontSize:18
    },
    bisect:{
        borderBottomWidth:1,
        marginVertical:10
    },
    quesText:{
        fontSize:16,
        fontWeight:'bold'
    },
    submit:{
        height:40,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius:8,
        borderWidth:1,
        borderColor:'dodgerblue',
        width:'100%',
    },
    submitText:{
        fontSize:20,
        color:'dodgerblue'
    },
    bottom_div:{
        marginVertical:5
    },
    buttonNext:{
        marginVertical:5
    },
    item: {
        padding: 14,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius:7,
    },
    title: {
        fontSize: 16,
    },
})

export default English
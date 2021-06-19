import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons} from '@expo/vector-icons';

export default function Tasklist({ data, handLeDelete}){
    return(
 <View style={styles.container} >

     <TouchableOpacity onPress={ ()=> handLeDelete(data)}>
     <Ionicons name="md-checkmark-circle" size={30} color="#121212"/>
           </TouchableOpacity>
           <View>
               <Text style={styles.task}> {data.task}</Text>
           </View>
        </View>
    )
}

 const styles = StyleSheet.create({
    container:{
      flex:1,
      margin: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 5,
      padding: 7,
      elevation: 1.5,
      shadowColor: '#000',
       shadowOpacity: 0.2,
       shadowOffset:{
           widht: 1,
           height: 3,
       } 
    },
    task:{
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    }
});
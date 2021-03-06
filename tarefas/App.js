import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView,TouchableOpacity, 
  StatusBar, FlatList, Modal, TextInput,AsyncStorage} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Tasklist from './src/components/Tasklist';



export default function App(){
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')

useEffect(()=> {
  
   async function loadTasks(){
    const taskStorage =  await AsyncStorage.getItem('@task');

    if(taskStorage){
      setTask(JSON.parse(taskStorage));
    }
  }

  loadTasks();

}, []);


useEffect(() => {

  async function saveTasks(){
    await AsyncStorage.setItem('@task', JSON.stringify(task));
  }

  saveTasks();
}, [task]);

  function handleAdd(){
    if(input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');

  }

  
  const handLeDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })


return(
  <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor='#171d31' barStyle="light-content" />

<View style={styles.content}>
  <Text style={styles.title}>Minhas Obrigações</Text>
</View>

<FlatList
showsHorizontalScrollIndicator={false}
marginHorizontal={10}
showsHorizontalScrollIndicator={false}
data={task}
keyExtractor={ (item) => String(item.key) }
renderItem={ ({ item}) => <Tasklist data={item}  handLeDelete={handLeDelete}/> }
/>
<Modal animationType="slide" transparent={false} visible={open}>
  <SafeAreaView style={styles.modal}>
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={ ()=> setOpen(false) }>
        <Ionicons style={{marginLeft: 5, marginRight: 5}} name="md-arrow-back" size={40} color="#FFF" /> 
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Nova Tarefa</Text>
    </View>

    <View style={styles.modalBody}>
      <TextInput
      multiline={true}
      placeholderTextColor="#747474"
      autoCorrect={false}
      placeholder= "Qual tarefa precisa lembrar?"
      style={styles.input}
      value={input}
        onChangeText={ (texto) => setInput(texto)}
      />
      <TouchableOpacity style={styles.handleAdd} onPress={ handleAdd }>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
</Modal>

<TouchableOpacity style={styles.fab}
onPress={ ()=> setOpen (true)}
>
  <Ionicons name="ios-add" size={35} color="#FFF" />
</TouchableOpacity>

  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#171d31'
  },
  title:{
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color:'#FFF'
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },
  modal:{
    flex:1,
    backgroundColor: '#171d31',

  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle:{
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF'
  },
  modalBody:{
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd:{
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  handleAddText:{
    fontSize: 20,
  }
});
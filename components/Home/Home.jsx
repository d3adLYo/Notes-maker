import { TextInput, View, StyleSheet, FlatList, Text, Pressable, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getData, storeData } from "../../utils/AsyncStore";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotes, deleteAllNotes } from "../../store/notesSlice";
import Notes from "./Notes/Note";
import { DARK_1, LIGHT_1 } from "../../constants/colors";

function Home({navigation}){
    const dispatch = useDispatch();
    const notesArray = useSelector(state => state.notes);

    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>{
                return (
                    <Pressable onPress={() => {
                        Alert.alert('Are you sure you want to delete all notes?', 'You can NOT undo this!', [
                            {
                                text:'Cancel',
                                onPress: ()=>{
                                    return
                                }
                            },
                            {
                                text:'OK',
                                onPress:()=>{
                                    dispatch(deleteAllNotes());
                                    storeData([]);
                                }
                            }
                        ]);

                    }}>
                        <Ionicons name='trash' size={35} color='black'/>
                    </Pressable>
                )
            }
        })

        async function gettingNotes(){
            let data2 = await getData();
            dispatch(setNotes(data2))
        };
        gettingNotes();
    }, []);

    const [inputValue, setInputValue] = useState('');

    let filtredNotesArray = notesArray.filter(item => item.title.includes(inputValue) || item.description.includes(inputValue));

    return(
        <View style={styles.homeContainer}>
            <TextInput value={inputValue} onChangeText={setInputValue} style={styles.input}/>
            <FlatList data={filtredNotesArray} renderItem={({item})=>
                    <Notes item={item} navigation={navigation}/>
                }
                numColumns={2}
                ListEmptyComponent={()=><Text style={styles.noNotes}>No notes found</Text>}
            />
            <Pressable style={styles.createBtn} onPress={()=>{navigation.navigate('Note', {title: '', description: ''})}}>
                <Ionicons name='create' size={40} color='white'/>
            </Pressable>
        </View>
    )
};

export default Home;

const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
      backgroundColor: LIGHT_1,
      padding:10,
      gap:10,
      position:'relative',
    },
    input: {
        width:'70%',
        borderWidth:2,
        borderStyle:'solid',
        borderColor: DARK_1,
        borderRadius:20,
        alignSelf:'center',
        paddingHorizontal:15,
        paddingVertical:5,
        fontSize:20,
    },
    noNotes: {
        alignSelf:'center',
        fontWeight:'bold',
        fontSize: 20,
    },
    createBtn: {
        position:'absolute',
        right: 25,
        bottom: 25,
        borderRadius:50,
        padding:10,
        backgroundColor:DARK_1,
    }
  });
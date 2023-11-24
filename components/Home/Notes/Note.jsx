import { View, Pressable, Text, StyleSheet } from "react-native";
import { DARK_1, LIGHT_2, LIGHT_3 } from "../../../constants/colors";

function Note({navigation, item}){
    return (
        <View style={styles.noteContainer}>
            <Pressable style={{flex:1}} onPress={()=>{navigation.navigate('Note', {title: item.title, description: item.description, id: item.id, color: item.color})}}>
                <Text style={[styles.noteTitle, {color:item.color}]}>{item.title}</Text>
                <Text style={[styles.noteText, {color:item.color}]} numberOfLines={7}>{item.description}</Text>
                <View style={styles.noteDateView}>
                    <Text style={styles.noteDateText}>{item.date}</Text>
                </View>
            </Pressable>
        </View>
    )
};

export default Note;

const styles = StyleSheet.create({
    noteContainer: {
        width:'47%',
        height:200,
        backgroundColor: LIGHT_2,
        borderWidth:1,
        borderStyle:'solid',
        borderColor: DARK_1,
        borderRadius:10,
        margin:5,
        padding:7,
        overflow:'hidden',
        position:"relative",
    },
    noteTitle: {
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
    },
    noteText: {
        fontSize:15,
    },
    noteDateView: {
        position:'absolute',
        bottom: 0,
        backgroundColor:LIGHT_3,
        width:'100%',
        alignItems:'center',
        borderRadius:15
    },
    noteDateText: {
        fontSize:15,
        letterSpacing: 1
    }
  });
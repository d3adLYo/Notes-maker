import { StyleSheet, View, TextInput, Pressable, Alert, BackHandler} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { storeData, getData } from "../../utils/AsyncStore";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { setNotes } from "../../store/notesSlice";
import ColorPicker from "./ColorPicker/ColorPicker";
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutRight} from "react-native-reanimated";
import { LIGHT_1 } from "../../constants/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SingleNote({route, navigation}){
    const dispatch = useDispatch();

    const { title, description, id, color } = route.params;

    const [ titleState, setTitleState ] = useState(title);
    const [ descriptionState, setDescriptionState ] = useState(description);
    const [ textColor, setTextColor ] = useState(color || 'black');

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const descriptionRef = useRef();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: ()=>{
                return (
                    <TextInput disableFullscreenUI={true} style={[style.title, {color:textColor}]} value={titleState} onChangeText={setTitleState}/>            
                )
            },
            headerLeft: () => {
                return (
                    <Pressable onPress={()=>{
                        (title == titleState && description == descriptionState && color == textColor) ? navigation.goBack()
                        : Alert.alert('Are you sure you want to leave?', 'You did NOT save a note!', [
                            {
                                text:'No',
                                onPress: ()=>{
                                    return
                                }
                            },
                            {
                                text:'Yes',
                                onPress:()=>{
                                    navigation.goBack();
                                }
                            }
                        ], {cancelable: true})

                    }}>
                        <Ionicons style={{marginRight:10}} name='arrow-back' size={30} color='black'/>
                    </Pressable>
                )
              },
            headerRight: (title == titleState && description == descriptionState && color == textColor ) ?
                () => {
                    return (
                        <Pressable onPress={()=>{
                            setIsSettingsOpen(!isSettingsOpen)
                        }}>
                            <Ionicons name={'settings-sharp'} size={35} color='black'/>
                        </Pressable>
                    )
                }
                : ()=>{
                    return (
                        <Pressable onPress={async ()=>{
                            if(!titleState) {
                                Alert.alert('The note must have a title!');
                                return;
                            }
                            const data = await getData();
                            let data2 = data;

                            const date = new Date().toString().slice(4, 10)

                            if(id) {
                                data2 = data.map(item => {
                                    if(item.id == id) {
                                        return {title: titleState, description: descriptionState, id, color: textColor, date}
                                    }
                                    else{
                                        return item
                                    }
                                });
                                navigation.setParams({
                                    title: titleState,
                                    description: descriptionState,
                                    id,
                                    color: textColor,
                                });
                            }
                            else {
                                const newId = uuidv4()
                                data2.push({title: titleState, description: descriptionState, id: newId, color: textColor, date});
                                navigation.setParams({
                                    title: titleState,
                                    description: descriptionState,
                                    id: newId,
                                    color: textColor,
                                })
                            };
                            dispatch(setNotes(data2));
                            storeData(data2);     
                        }}>
                            <Ionicons name={'checkmark'} size={35} color='black'/>
                        </Pressable>
                    )
                },
        });

    },[navigation, titleState, descriptionState, textColor, isSettingsOpen, route.params])
    
    useFocusEffect(
        useCallback(()=>{
            const onBackPress = () => {
                (title == titleState && description == descriptionState && color == textColor) ? navigation.goBack()
                        : Alert.alert('Are you sure you want to leave?', 'You did NOT save a note!', [
                            {
                                text:'No',
                                onPress: ()=>{
                                    return
                                }
                            },
                            {
                                text:'Yes',
                                onPress:()=>{
                                    navigation.goBack();
                                }
                            }
                        ], {cancelable: true})
                return true
              };
          
              BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
              );
          
              return () =>
                BackHandler.removeEventListener(
                  'hardwareBackPress', onBackPress
                );
        }, [navigation, titleState, descriptionState, textColor, isSettingsOpen, route.params])
    )
    
    return(
        <View style={style.noteContainer}>
            <Pressable style={{flex:1}} onPress={()=>{
                descriptionRef.current.focus()
            }}>
                <TextInput disableFullscreenUI={true} value={descriptionState} onChangeText={setDescriptionState} style={[style.description, {color: textColor}]} multiline ref={descriptionRef}/>
            </Pressable>

            {isSettingsOpen &&  (
                <>
                    <AnimatedPressable style={style.backdrop}
                        onPress={()=>setIsSettingsOpen(false)}
                        entering={FadeIn}
                        exiting={FadeOut}
                    />
                    <Animated.View style={style.settingsMenu}
                        entering={SlideInLeft.springify().damping(15)}
                        exiting={SlideOutRight}
                    >
                        <ColorPicker onPressing={(color)=>{
                            setTextColor(color);
                            setIsSettingsOpen(false);
                        }}/>
                    </Animated.View>
                </>
            )}
        </View>
    )
};

export default SingleNote;

const style = StyleSheet.create({
    noteContainer: {
        backgroundColor: LIGHT_1,
        flex:1,
        position:'relative',
    },
    title: {
        fontSize:25,
        fontWeight:'bold',
        width:240,
    },
    description: {
        fontSize:22,
        padding:10,
        paddingHorizontal:20,
    },
    settingsMenu: {
        position:'absolute',
        backgroundColor: LIGHT_1,
        width:'100%',
        height: 200,
        zIndex: 2,
        top: 0,
        gap: 5,
        padding: 10,
        justifyContent:'center'
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0, 0, 0, 0.2)',
        zIndex:1
    }
})
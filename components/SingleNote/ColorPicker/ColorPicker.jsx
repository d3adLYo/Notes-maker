import { TouchableOpacity, StyleSheet, View, Text, useWindowDimensions, ScrollView } from "react-native";
import { colors } from "../../../constants/colors";

function ColorPicker({onPressing}){
    const windowWidth = useWindowDimensions().width
    
    return (
        <>
            <Text style={style.colorTitle}>
                Choose text color
            </Text>
            {windowWidth < 500 ? (
                <View style={style.colorContainerView}>
                    {colors.map(color => (
                        <TouchableOpacity key={color} onPress={()=>{onPressing(color)}} style={[style.colorBox, {backgroundColor: color, height:windowWidth/7}]}/>
                    ))}
                </View>
                )
            : (
                <ScrollView contentContainerStyle={style.colorContainerScrollView} horizontal showsHorizontalScrollIndicator={false}>
                    {colors.map(color => (
                        <TouchableOpacity key={color} onPress={()=>{onPressing(color)}} style={[style.colorBox, {backgroundColor: color, height:windowWidth/9}]}/>
                    ))}
                </ScrollView>
            )}
        </>
    )
};

export default ColorPicker;

const style = StyleSheet.create({
    colorTitle: {
        fontSize:27,
        fontWeight:"600",
    },
    colorContainerView:{
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap',
        gap: 10,
    },
    colorContainerScrollView: {
        gap: 15,
        alignItems:'center'
    },
    colorBox: {
        aspectRatio: 1,
        borderRadius: 4,
    }
});
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Home from './components/Home/Home';
import SingleNote from './components/SingleNote/SingleNote';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:'#F1DEC9'},
          animation:'fade_from_bottom',
      
        }}>
          <Stack.Screen name='Home' component={Home} options={{
              title:'All notes',
              headerTitleStyle:{
                fontSize:25,
              },
            }}/>
          <Stack.Screen name='Note' component={SingleNote} options={{
              headerBackVisible: false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

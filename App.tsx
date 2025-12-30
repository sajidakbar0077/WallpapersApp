import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import Layout from './src/layout/Layout';
import ContextProvider from './src/context/ContextProvider';
export type RootStackParamList = {
  [x: string]: any;
  signUp:undefined,
  login:undefined,
  layout:undefined
}
const Stack=createNativeStackNavigator<RootStackParamList>()
const App = () => {
  return (
   <ContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='signUp' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='layout' component={Layout} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
   </ContextProvider>
    
  )
}

export default App
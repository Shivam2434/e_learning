import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home'
import English from '../screens/english'
import GK from '../screens/gk'
import Reasoning from '../screens/reasoning'

const Stack = createNativeStackNavigator()

const AllRoutes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="English" component={English} />
                <Stack.Screen name="GK" component={GK} />
                <Stack.Screen name="Reasoning" component={Reasoning} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AllRoutes;
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screen/Homescreen/HomeScreen';
import FavoriteScreen from '../screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../screen/ProfileScreen/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='home' component={HomeScreen} options={{tabBarLabel:'Search', tabBarActiveTintColor:Colors.PRIMARY, tabBarIcon: ({color, size})=>(
            <AntDesign name="search1" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name='favorite' component={FavoriteScreen} options={{tabBarLabel:'Favorite', tabBarActiveTintColor:Colors.PRIMARY, tabBarIcon: ({color, size})=>(
            <MaterialIcons name="favorite-border" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name='profile' component={ProfileScreen} options={{tabBarLabel:'Profile', tabBarActiveTintColor:Colors.PRIMARY, tabBarIcon: ({color, size})=>(
            <Feather name="user" size={size} color={color} />
        )
        }}/>
    </Tab.Navigator>
  )
}
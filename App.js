
import 'react-native-gesture-handler';

import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Linking} from 'react-native'
// import * as firebase from 'firebase';

import SymptomsScreen from './pages/Symptoms';
import CaseUpdateScreen from './pages/CaseUpdate';
import EmergencyCallScreen from './pages/EmergencyCall';
import NewsFeedScreen from './pages/NewsFeed';
import MapScreen from './pages/MapScreen';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
// import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase

// const firebaseConfig = {
//   apiKey: "AIzaSyCUpBNa20rS92Cy3NyAbjs0KzMoL7aPRns",
//   authDomain: "expo-safety.firebaseapp.com",
//   databaseURL: "https://expo-safety.firebaseio.com",
//   projectId: "expo-safety",
//   storageBucket: "expo-safety.appspot.com",
//   messagingSenderId: "1059346880103",
//   appId: "1:1059346880103:web:f2e67db9344a62741e66c2",
//   measurementId: "G-1NNN9SY541"
// };

// firebase.initializeApp(firebaseConfig);

// console.log("Helloo :",firebase)

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Home"
        component={SymptomsScreen}
        options={{ title: 'Home Page' }}
      />     
    </Stack.Navigator>
  );
}

function EmergencyCallStack() {
  return (
    <Stack.Navigator
      initialRouteName="EmergencyCall"
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Home"
        component={EmergencyCallScreen}
        options={{ title: 'Emergency Call' }}
      />     
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: 'Home Page' }}
      />
    </Stack.Navigator>
  );
}

function CaseUpdateStack() {
  return (
    <Stack.Navigator
      initialRouteName="CaseUpdate"
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="CaseUpdate"
        component={CaseUpdateScreen}
        options={{ title: 'Home Page' }}
      />
    </Stack.Navigator>
  );
}


function NewsFeedStack() {
  return (
    <Stack.Navigator
      initialRouteName="NewsFeedScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="NewsFeedScreen"
        component={NewsFeedScreen}
        options={{ title: 'Home Page' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#3CAEA3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#3CAEA3',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="EmergencyCallStack"
          component={EmergencyCallStack}
          options={{
            tabBarLabel: 'Emergency',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="phone"
                color={color}
                size={size}
              />
            ),
          }}
        />

        {/* <Tab.Screen
          name="MapStack"
          component={MapScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-search-outline"
                color={color}
                size={size}
              />
            ),
          }}
        /> */}

        <Tab.Screen
          name="CaseUpdateStack"
          component={CaseUpdateStack}
          options={{
            tabBarLabel: 'Case Update',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="update"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="NewsFeedStack"
          component={NewsFeedScreen}
          options={{
            tabBarLabel: 'News',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="newspaper"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

import * as firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  Picker,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import { Block, Button, TextView } from '../components';
import { Colors } from '../color';
const W = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';


// Optionally import the services that you want to use
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

  /////
  const MapScreen = () => {


    var firebaseConfig = {
      apiKey: "AIzaSyCUpBNa20rS92Cy3NyAbjs0KzMoL7aPRns",
      authDomain: "expo-safety.firebaseapp.com",
      databaseURL: "https://expo-safety.firebaseio.com",
      projectId: "expo-safety",
      storageBucket: "expo-safety.appspot.com",
      messagingSenderId: "1059346880103",
      appId: "1:1059346880103:web:f2e67db9344a62741e66c2",
      measurementId: "G-1NNN9SY541"
    };
    
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    ////
  
    const dbh = firebase.firestore();

    const navigationOptions = {
      title: 'Sri Lanka',
    };

    const state = {
      initialPosition: {
        latitude: 6.9016,
        longitude: 80.0088,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
      }
    }

    const [destinationOfflineList, setdestinationOfflineList] = useState();
    const [unsafeOffline, setunsafeOffline] = useState();

    const [destinationList, setdestinationList] = useState();
    const [load, setload] = useState(false);
  
    useEffect(() => {
        (async () => {
            try {
                const locRef = dbh.collection('cordinates');
                const snapshot = await locRef.where('status', '==', 'alert').get();
                const destination = [];
                snapshot.forEach(doc => {
                    destination.push(doc.data());
                });
                console.log("destination",destination);
                await AsyncStorage.setItem('@destination_key', JSON.stringify(destination));
                setdestinationList(destination);
                setload(true);
            } catch {
                const destination = await AsyncStorage.getItem('@destination_key');
                setdestinationOfflineList(JSON.parse(destination));
            }
        })();
    }, []);

    function getData(){
        firebase.database().ref('cordinates/').on('value', (snapshot) => {
          const description = snapshot.val().description;
          console.log("description: " + description);
        });
      }


    return (
        
        <TextView>
            <Text onPress={getData()} >Hello</Text>

            {getData()}
        </TextView>
    );

    
      // return (
      //   <View style={styles.container}>
      //     <MapView
      //       provider={PROVIDER_GOOGLE}
      //       ref={map => this._map = map}
      //       style={styles.map}
      //       initialRegion={this.state.initialPosition}>
      //       <Heatmap
      //         points={this.points}
      //         radius={40}
      //         opacity={1}
      //         gradient={{
      //           colors: ["black", "purple", "red", "orange", "white"],
      //           startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
      //             [0.1, 0.25, 0.5, 0.75, 1],
      //           colorMapSize: 2000
      //         }}
      //       >
      //       </Heatmap>
      //     </MapView>
      //   </View>
      // );
    
  };

  export default MapScreen;
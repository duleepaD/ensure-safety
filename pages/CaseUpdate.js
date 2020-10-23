import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Block, Button, TextView } from '../components';
import { Colors } from '../color';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import * as Location from 'expo-location';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";


const W = Dimensions.get('window').width;


const Item = ({ icon, title }) => {
  return (
    <Block block centered>
      <Button middle shadow color="#fff" padding={10} borderRadius={12}>
        <Image source={icon} />
        <TextView bold center>
          {title}
        </TextView>
      </Button>
    </Block>
  );
};

const ItemField = ({ icon, title, desc }) => {
  return (
    <Button>
      <Block
        direction="row"
        borderRadius={10}
        shadow
        color="#fff"
        padding={6}
        paddingHorizontal={-1}
        style={{ marginTop: 10 }}>
        <Image style={styles.img_item} resizeMode="contain" source={icon} />
        <Block padding={10} style={styles.field_con}>
          <TextView size={16} bold>
            {title}
          </TextView>
          <TextView style={styles.textDesc}>{desc}</TextView>
        </Block>

      </Block>
    </Button>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },

  wrapperimage: {
    position: 'absolute',
    bottom: 0,

    alignSelf: 'center',
    width: W,
    height: 300,
  },
  bg: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    top: -(930 - W / 2),
    alignSelf: 'center',
    // top: 500 - W / 2,
    // left: 500 - W / 2,
    borderRadius: 1000,
    overflow: 'hidden',
  },
  containerHeader: {
    position: 'relative',
  },

  img_item: {
    width: (1.2 * W) / 3,
    height: (1.2 * W) / 3,
  },
  field_con: {
    position: 'absolute',
    width: (2 * W) / 3,
    left: W / 3 + 10,
    top: 10,
    paddingVertical: 10,
  },
  textDesc: {
    lineHeight: 20,
    marginTop: 10,
    maxWidth: (2 * W) / 3.4,
  },
});

const ItemDot = ({ color1, color2, num, title, destinationList, destination }) => {
  return (
    <Block block>
      <Block middle>
        <Block
          width={30}
          height={30}
          middle
          centered
          borderRadius={30}
          color={color1}>
          <Block
            width={20}
            height={20}
            borderWidth={4}
            borderRadius={20}
            borderColor={color2}
          />
        </Block>
        <TextView padding={15} color={color2} h3>
          {num}
        </TextView>
        <TextView color="gray" h6>
          {title}
        </TextView>
      </Block>
    </Block>
  );
};

const CaseUpdate = () => {

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

  const dbh = firebase.firestore();

  const [casesOfflineList, setcasesOfflineList] = useState();
  const [destinationOfflineList, setdestinationOfflineList] = useState();

  const [unsafeOffline, setunsafeOffline] = useState();

  const [casesList, setcasesList] = useState();
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
        console.log("destination", destination);
        await AsyncStorage.setItem('@destination_key', JSON.stringify(destination));
        setdestinationList(destination);
        setload(true);
        console.log("destinationList", destinationList);

      } catch {
        const destination = await AsyncStorage.getItem('@destination_key');
        setdestinationOfflineList(JSON.parse(destination));
      }


      try {
        const locRef = dbh.collection('cordinates');
        const snapshot = await locRef.where('case', '==', 'true').get();
        const cases = [];
        snapshot.forEach(doc => {
          cases.push(doc.data());
        });
        console.log("Cases", cases);
        await AsyncStorage.setItem('@cases_key', JSON.stringify(cases));
        setcasesList(cases);
        setload(true);
        console.log("casesList", casesList);

      } catch {
        const cases = await AsyncStorage.getItem('@cases_key');
        setcasesOfflineList(JSON.parse(cases));
      }
    })();
  }, []);

  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1 }}>
      <Block block color="#fafafa">

        <Block padding={10} style={{ marginTop: 10 }}>
          <Block justifyContent="space-between" direction="row">
            <Block>
              <TextView h6>Case Update</TextView>
            </Block>
          </Block>
          <Block
            color="#fff"
            borderRadius={8}
            padding={10}
            shadow
            style={{ marginTop: 10 }}
            direction="row">
            <ItemDot
              color1={Colors.carot_op}
              color2={Colors.carot}
              num={5019}
              title={'Total Cases'}
            />
            <ItemDot
              color1={Colors.red_op}
              color2={Colors.red}
              num={87}
              title={'Deaths'}
            />

            <ItemDot
              color1={Colors.green_op}
              color2={Colors.green}
              num={46}
              title={'Recovered'}
            />
          </Block>

        </Block>
      </Block>


      <Block block color="#fafafa">

        <Block padding={10}>
          <TextView h6>Nearest Alert Locations</TextView>
          
          <View>
            <FlatList vertical={true} data={destinationList}
              renderItem={({ item }) => {
                return (
                  <View style={{ paddingVertical: 20, paddingLeft: 16, color: "#000000" }}>
                    <TouchableOpacity>
                    <ItemField>
                      {/* <Image source={item.uri} style={{ width: 150, marginRight: 8, height: 250, borderRadius: 10 }} /> */}
                      {/* <View style={styles.imageOverlay}></View> */}
                      icon={require('../images/map.png')}
                      desc={item.description}
                      title={item.name}
                      </ItemField> 
                    </TouchableOpacity>
                  </View>
                )
              }}>
            </FlatList>
          </View>
          <Block 
          vertical={true} data={destinationList}
            renderItem={({ item }) => {
              return (
            //   <ItemField
            //   title="Woman on a flightdied from COVID-19"
            //   desc="A woman in her 30s died on an airplane from COVID-19, Dallas County officials announced on Sunday."
            //   icon={require('../images/map.png')}
            // />
                
                <ItemField>
                <Text>title = {item.description}</Text>
                </ItemField>
                
              )
            }}
            >
              <ItemField
              title="Gampaha"
              desc="Authorities impose indefinite curfew in Gampaha."
              icon={require('../images/map.png')}
            />
            <ItemField
              title="Ja-Ela"
              desc="Sri Lanka imposes curfew in, Seeduwa, Ja-Ela, Kandana to contain Covid-19 spread. Wednesday October 7, 2020 "
              icon={require('../images/map.png')}
            />
            <ItemField
              title="Amid pandemic"
              desc="When there’s a public health crisis or disaster like the coronavirus pandemic, experts know that.."
              icon={require('../images/map.png')}
            />
          </Block>
        </Block>
      </Block>



    </ScrollView>
  );
};


export default CaseUpdate;
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const colors = {
  themeColor:"#3CAEA3",
  white:"#fff",
  background:"#f4f6fc",
  greyish: "#a5a5a5"
};

const screenwidth = Dimensions.get("window")

const symptoms = [{
  symptom:"Cold",
  icon :"snowflake",
  selected: true,
  desc: "Runny Nose"
},
{
  symptom:"Dry Cough",
  icon :"flash",
  selected: false,
  desc: "Sore Throat"
},
{
  symptom:"Fever",
  icon :"thermometer",
  selected: false,
  desc: "Chills"
},
{
  symptom:"Short Breath",
  icon :"air-filter",
  selected: false,
  desc: "Difficulty Breathing"
}];

const Symptom = ({symptom,icon,desc,selected}) => {
  return <View 
  style={{
    backgroundColor: selected?colors.themeColor: colors.white, 
    margin:8, 
    borderRadius:20, 
    paddingVertical:20, 
    paddingHorizontal: 24,
    width: (screenwidth- 64)/2
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: "700",
        color: selected? colors.white : colors.greyish
      }}>{symptom}</Text>
      <Text style={{fontSize:16, marginVertical:7, color:selected? colors.white : colors.greyish}}>
{desc}      </Text>
      <MaterialCommunityIcons name={icon} size={45} style={{
        alignSelf:"flex-end",
        color: selected? colors.white : colors.themeColor
      }}/>
  </View>
}

export default function App(props){
  return(
    <View style={{
      flex: 1,
      backgroundColor:colors.background,
      paddingHorizontal:6

    }}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content"/>
      <View style={{
        padding:10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}>

      </View>
      <View style={{
        padding:10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <View>
          <Text style={{ fontSize: 16}}>COVID-19</Text>
          <Text style={{ fontSize: 20}}>Symptoms</Text>
          <Text></Text>

        </View>
        <MaterialCommunityIcons
         name="alert-decagram" 
         size={45} 
         style={{color:colors.white, backgroundColor:colors.themeColor}}/>
      </View>
      <View 
      style={{
        borderTopWidth:6, 
        borderTopColor:colors.themeColor, 
        borderRadius:3, 
        marginHorizontal:20,
        width: 40,
        marginTop: -5
        }}/>
        <View style={{ paddingHorizontal:8, paddingVertical: 30}}>
            <FlatList
              numColumns={2}
              data={symptoms} 
              keyExtractor={item => item.symptom}
              renderItem = {({item}) => 
              <Symptom 
              symptom={item.symptom}
                            desc = {item.desc}

              icon={item.icon}
              selected={item.selected}/>} 
            />
        </View>
    </View>

  );
}
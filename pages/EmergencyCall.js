import React from 'react';
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
} from 'react-native';
import { Block, Button, TextView } from '../components';
import { Colors } from '../color';
const W = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';

const colors = {
  themeColor: '#3CAEA3',
  white: '#fff',
  background: '#f4f6fc',
  greyish: '#a5a5a5',
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
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
});

const EmergencyCallScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Block block color="#fafafa">
        <Block
          height={500}
          color={Colors.green_Theme}
          style={styles.bg}></Block>
        <Block style={styles.containerHeader}>
          <Image style={styles.img} source={require('../images/virus.png')} />
        </Block>
        <Block>
          <Button
            color="#fff"
            borderWidth={1}
            borderColor="#f0f0f0"
            margin={10}
            borderRadius={30}>
            <Block direction="row" paddingHorizontal={15} middle></Block>
          </Button>
        </Block>
        <Block padding={10} style={{ marginTop: 10 }}>
          <Block justifyContent="space-between" direction="row">
            <TextView h6>Emergency Call</TextView>
          </Block>
          <Block
            color="#fff"
            borderRadius={8}
            padding={10}
            shadow
            style={{ marginTop: 10 }}
            direction="row">
            <View
              onPress={() => {
                Linking.openURL('tel:119');
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons onPress={() => {
                Linking.openURL('tel:119');
              }}
                name="phone"
                size={50}
                style={{
                  color: colors.white,
                  backgroundColor: colors.themeColor,
                  borderRadius: 12,
                }}
              />
            </View>
            
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default EmergencyCallScreen;

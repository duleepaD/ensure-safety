  
import React from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import {Block, Button, TextView} from '../components';
import {Colors} from '../color';
const W = Dimensions.get('window').width;
const styles = StyleSheet.create({

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

const Item = ({icon, title}) => {
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

const ItemField = ({icon, title, desc}) => {
  return (
    <Button>
      <Block
        direction="row"
        borderRadius={10}
        shadow
        color="#fff"
        padding={6}
        paddingHorizontal={-1}
        style={{marginTop: 10}}>
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

const NewsFeedScreen = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <Block block color="#fafafa">
      
        <Block padding={10}>
          <TextView h6>News Feed</TextView>
          <Block>
            <ItemField
              title="Coronaviruses ‘inactivated’ by mouthwash:study"
              desc="A new study conducted by researchers at the Penn State College of Medicine has found that a common dental item can..."
              // icon={require('../images/1.jpg')}
            />
            <ItemField
              title="Woman on a flightdied from COVID-19"
              desc="A woman in her 30s died on an airplane from COVID-19, Dallas County officials announced on Sunday."
              // icon={require('../images/2.jpg')}
            />
            <ItemField
              title="Amid pandemic"
              desc="When there’s a public health crisis or disaster like the coronavirus pandemic, experts know that.."
              // icon={require('../images/3.jpg')}
            />
          </Block>
        </Block>
      </Block>
      
    </ScrollView>
  );
};

export default NewsFeedScreen;
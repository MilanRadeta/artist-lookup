import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/Colors';
import { SCREEN_WIDTH } from '../constants/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ListItem = ({
  item,
  header,
  details,
  onPress,
  showPlay,
  isPlaying,
}) => {
  const { width, height } = styles.image;
  const images =
    item.images &&
    item.images.filter(i => i.width >= width && i.height >= height);
  const image = images[images.length - 1] || {};

  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(item)}>
      <View style={styles.image}>
        <Image
          source={{
            uri: image && image.url,
            width: Math.min(width, image.width) || width,
            height: Math.min(height, image.height) || height,
          }}
          resizeMode={'contain'}
        />
        {showPlay ? (
          <Icon
            style={styles.icon}
            name={isPlaying ? 'stop' : 'play'}
            size={30}
            color={COLORS.WHITE}
          />
        ) : null}
      </View>
      <View style={styles.details}>
        <Text style={styles.header}>{header}</Text>
        {details.map((d, i) => (
          <Text key={i} style={styles.text}>
            {d}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.CARD,
    marginVertical: 5,
  },
  icon: {
    position: 'absolute',
  },
  details: {
    flex: 1,
  },
  image: {
    marginRight: 10,
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

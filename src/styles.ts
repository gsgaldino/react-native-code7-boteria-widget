import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    // padding: 10,
    // paddingTop: 26,
  },
});

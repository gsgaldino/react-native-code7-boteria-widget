import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  // areaView: {
  //   position: 'absolute',
  //   width: 70,
  //   height: 70,
  //   bottom: 18,
  //   right: 18,
  // },
  app: {
    flex: 1,
  },
});

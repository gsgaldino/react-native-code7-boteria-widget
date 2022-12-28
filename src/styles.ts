import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  areaView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  app: {
    flex: 1,
  },
});

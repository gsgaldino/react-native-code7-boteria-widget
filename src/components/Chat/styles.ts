import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');
const headerHeight = 48;

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'baseline',
    width: screen.width,
    height: screen.height - headerHeight,
    position: 'absolute',
    bottom: 0,
    right: 0,
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 99,
  },
  closed: {
    display: 'none',
  },
});

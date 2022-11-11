import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 8,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  closed: {
    display: 'none',
  },
});

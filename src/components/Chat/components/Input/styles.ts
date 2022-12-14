import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    position: 'relative',
  },
  input: {
    backgroundColor: '#F3F5F9',
    borderRadius: 16,
    height: 64,
    paddingVertical: 0,
    paddingLeft: 20,
  },
  icons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 24,
    top: 0,
    transform: [{ translateY: 28 }],
  },
  sendIcon: {
    width: 21,
    height: 18,
  },
  attachIcon: {
    width: 19,
    height: 22,
    marginRight: 14,
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0086FF',
    width: '100%',
    height: 80,
    padding: 16,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  closeIconContainer: {
    padding: 10,
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});

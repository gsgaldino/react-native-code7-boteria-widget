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
  iconContainer: {
    padding: 10,
  },
  iconsWrapper: {
    flexDirection: 'row',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
});

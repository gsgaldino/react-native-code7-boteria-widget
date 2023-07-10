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
    width: '100%',
    paddingRight: 100,
  },
  titleIcon: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  iconsWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 16,
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

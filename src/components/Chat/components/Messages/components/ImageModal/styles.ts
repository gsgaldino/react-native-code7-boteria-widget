import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlayText: {
    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonCloseModal: {
    fontSize: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modal: { width: '100%', height: '95%' },
});

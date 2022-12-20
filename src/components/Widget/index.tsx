import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useChatConfigurations } from '../../context/ChatConfigurations';
import Icon from '../../components/Icon';
import { styles } from './styles';

function Widget() {
  const { toggleIsChatOpen } = useChatConfigurations();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toggleIsChatOpen()}
    >
      <Icon />
    </TouchableOpacity>
  );
}

export default Widget;

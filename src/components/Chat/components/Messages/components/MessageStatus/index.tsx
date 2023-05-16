import type { PropsWithChildren } from 'react';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { From, MessageTypes } from '../../../../../../types';
// import iconSent from '../../../../../../assets/status_sent.png';
// import iconDelivered from '../../../../../../assets/status_delivered.png';
// import iconRead from '../../../../../../assets/status_read.png';
// import iconFailed from '../../../../../../assets/status_failed.png';

type MessageStatusWrapperProps = PropsWithChildren<{
  status: 'delivered' | 'read' | 'sent' | 'failed';
  from: From;
  type: MessageTypes;
}>;

export const MessageStatusWrapper = ({
  // type,
  // status,
  from,
  children,
}: MessageStatusWrapperProps) => {
  // const icons = {
  //   delivered: iconDelivered,
  //   sent: iconSent,
  //   read: iconRead,
  //   failed: iconFailed,
  // };

  return (
    <View
      style={[from === From.BOT ? styles.bot : styles.user, styles.container]}
    >
      {/* {type !== MessageTypes.TYPING && (
        <Image style={styles.image} source={icons[status] || icons.sent} />
      )} */}

      <View>
        <Text>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  user: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  bot: {
    flexDirection: 'row-reverse',
    paddingRight: 16,
  },
  image: {
    marginHorizontal: 2,
    marginBottom: 4,
  },
});

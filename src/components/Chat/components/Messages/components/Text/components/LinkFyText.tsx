import React from 'react';

import { Text, Linking } from 'react-native';

interface BoldTextProps {
  text: string;
}

const BoldText: React.FC<BoldTextProps> = ({ text }) => {
  return <Text style={{ fontWeight: 'bold' }}>{text}</Text>;
};

interface LinkifyTextProps {
  text: string;
}

const LinkifyText: React.FC<LinkifyTextProps> = ({ text }) => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const linkRegex = /(https?:\/\/[^\s]+)/g;

  const boldRegex = /\*(.*?)\*/g;

  const linkParts = text.split(linkRegex);

  const finalParts = linkParts.map((part, index) => {
    if (part.match(linkRegex)) {
      return (
        <Text key={index} onPress={() => handleLinkPress(part)}>
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
            }}
          >
            {part}
          </Text>
        </Text>
      );
    }

    const boldParts = part.split(boldRegex);
    const removeTextWithBold = part.match(boldRegex) || [''];

    const textParts = boldParts.map((boldPart, boldIndex) => {
      if (removeTextWithBold[0].includes(boldPart)) {
        return <BoldText key={boldIndex} text={boldPart} />;
      }

      return <Text key={boldIndex}>{boldPart}</Text>;
    });

    return <Text key={index}>{textParts}</Text>;
  });

  return <Text>{finalParts}</Text>;
};

export default LinkifyText;

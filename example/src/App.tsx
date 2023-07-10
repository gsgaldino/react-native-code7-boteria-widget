import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Switch,
} from 'react-native';

import { Code7Boteria } from 'code7-boteria-lib-mobile-rn';

interface IConfigurations {
  botId: string;
  showCustomWidget: boolean;
}

export default function App() {
  const BOT_ID = '62e9145fc073550012d52f25';

  const initialConfigs: IConfigurations = {
    botId: BOT_ID,
    showCustomWidget: false,
  };

  const [configurations, setConfigurations] =
    useState<IConfigurations>(initialConfigs);
  const { botId, showCustomWidget } = configurations;

  const [useBotIdCustom, setUseBotIdCustom] = useState<boolean>(true);

  useEffect(() => {
    if (!useBotIdCustom) {
      setUseBotIdCustom(true);
    }
  }, [useBotIdCustom]);

  const handleSetBotId = (value: string) => {
    setConfigurations((oldState) => ({
      ...oldState,
      botId: value.trim(),
    }));
    setUseBotIdCustom(false);
  };

  const handleToggleWidget = () => {
    setConfigurations((oldState) => ({
      ...configurations,
      showCustomWidget: !oldState.showCustomWidget,
    }));
    setUseBotIdCustom(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>BotId customizado</Text>
      <TextInput
        style={styles.textInput}
        value={configurations.botId}
        onChangeText={handleSetBotId}
      />
      <View style={styles.flexItem}>
        <Switch
          onValueChange={handleToggleWidget}
          value={configurations.showCustomWidget}
        />
        <Text>Mostrar widget customizado</Text>
      </View>
      {useBotIdCustom && (
        <Code7Boteria
          staging
          botId={botId ?? BOT_ID}
          children={showCustomWidget && <Button title="Abrir chat" />}
          params={{
            name: 'Joe Doe',
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  flexItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  },
});

import { IEnvironment } from '../types';

interface IEnvironments {
  development: IEnvironment;
  staging: IEnvironment;
  production: IEnvironment;
}

export const environments: IEnvironments = {
  development: {
    SOCKET_URL: 'http://e502-200-100-194-234.ngrok.io',
    API_URL: 'http://b5d6-200-100-194-234.ngrok.io',
    GET_BOT_URL: 'http://5ba7-200-100-194-234.ngrok.io/dev/getBotCdn',
  },
  staging: {
    SOCKET_URL:
      'wss://k66xbjj993.execute-api.sa-east-1.amazonaws.com/homologacao/',
    API_URL: 'https://wapp.testesboteria.com.br',
    GET_BOT_URL:
      'https://8g82aisqs3.execute-api.sa-east-1.amazonaws.com/test/getBotCdn/',
  },
  production: {
    SOCKET_URL: 'https://socket.boteria.com.br',
    API_URL: 'https://wapp.boteria.com.br',
    GET_BOT_URL:
      'https://8g82aisqs3.execute-api.sa-east-1.amazonaws.com/test/getBotCdn/',
  },
};

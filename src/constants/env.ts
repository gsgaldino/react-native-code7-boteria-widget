import { IEnvironment } from '../types';

interface IEnvironments {
  development: IEnvironment;
  staging: IEnvironment;
  production: IEnvironment;
}

export const environments: IEnvironments = {
  development: {
    SOCKET_URL:
      'http://7417-2804-431-cff7-9f43-956c-ccc-691b-31f1.ngrok-free.app',
    API_URL: 'http://3ace-2804-431-cff7-9f43-956c-ccc-691b-31f1.ngrok-free.app',
    GET_BOT_URL:
      'http://47c2-2804-431-cff7-9f43-956c-ccc-691b-31f1.ngrok-free.app',
  },
  staging: {
    SOCKET_URL:
      'wss://k66xbjj993.execute-api.sa-east-1.amazonaws.com/homologacao/',
    API_URL: 'https://wapp.testesboteria.com.br',
    GET_BOT_URL:
      'https://8g82aisqs3.execute-api.sa-east-1.amazonaws.com/test/getBotCdn/',
  },
  production: {
    SOCKET_URL:
      'wss://m9bdiwm1x8.execute-api.sa-east-1.amazonaws.com/production/',
    API_URL: 'https://wapp.boteria.com.br',
    GET_BOT_URL:
      'https://8g82aisqs3.execute-api.sa-east-1.amazonaws.com/test/getBotCdn/',
  },
};

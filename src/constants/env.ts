import { IEnvironment } from '../types';

interface IEnvironments {
  development: IEnvironment;
  staging: IEnvironment;
  production: IEnvironment;
}

export const environments: IEnvironments = {
  development: {
    SOCKET_URL:
      'http://4fc3-2804-431-cff7-6024-843a-9b3d-8e87-5f8f.ngrok-free.app',
    API_URL:
      'http://3d48-2804-431-cff7-6024-843a-9b3d-8e87-5f8f.ngrok-free.app',
    GET_BOT_URL:
      'http://41bd-2804-431-cff7-6024-843a-9b3d-8e87-5f8f.ngrok-free.app/dev/getBotCdn',
  },
  staging: {
    SOCKET_URL:
      'wss://k66xbjj993.execute-api.sa-east-1.amazonaws.com/homologacao',
    API_URL: 'https://wapp.testesboteria.com.br',
    GET_BOT_URL:
      'https://8g82aisqs3.execute-api.sa-east-1.amazonaws.com/test/getBotCdn',
  },
  production: {
    SOCKET_URL:
      'wss://m9bdiwm1x8.execute-api.sa-east-1.amazonaws.com/production/',
    API_URL: 'https://wapp.boteria.com.br',
    GET_BOT_URL:
      'https://v72a6qtdol.execute-api.sa-east-1.amazonaws.com/prod/getBotCdn/',
  },
};

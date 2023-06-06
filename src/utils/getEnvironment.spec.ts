import { getEnvironment } from './getEnvironment';
import { environments } from '../constants';

describe('getEnvironment util function', () => {
  it('should get development environment', () => {
    const env = getEnvironment({ staging: false, dev: true });
    expect(env.API_URL).toBe(environments.development.API_URL);
    expect(env.SOCKET_URL).toBe(environments.development.SOCKET_URL);
    expect(env.GET_BOT_URL).toBe(environments.development.GET_BOT_URL);
  });

  it('should get staging environment', () => {
    const env = getEnvironment({ staging: true, dev: false });
    expect(env.API_URL).toBe(environments.staging.API_URL);
    expect(env.SOCKET_URL).toBe(environments.staging.SOCKET_URL);
    expect(env.GET_BOT_URL).toBe(environments.staging.GET_BOT_URL);
  });

  it('should get production environment', () => {
    const env = getEnvironment({ staging: undefined, dev: undefined });
    expect(env.API_URL).toBe(environments.production.API_URL);
    expect(env.SOCKET_URL).toBe(environments.production.SOCKET_URL);
    expect(env.GET_BOT_URL).toBe(environments.production.GET_BOT_URL);
  });
});

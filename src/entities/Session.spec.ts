import { Session } from './Session';

describe('Session test suite', () => {
  it('should create a session with initial data', () => {
    const expectedSession = '123123123345345';
    const session = new Session(expectedSession);

    expect(session.current).toBe(expectedSession);
  });

  it('should register and change a session', () => {
    const firstSession = '123123123456456';
    const session = new Session();
    session.changeSession(firstSession);

    expect(session.current).toBe(firstSession);

    const secondSession = '3213213216565';
    session.changeSession(secondSession);

    expect(session.current).toBe(secondSession);
  });

  it('should clear session', () => {
    const session = new Session('123123123456456');
    session.clearSession();

    expect(session.current).toBeFalsy();
  });
});

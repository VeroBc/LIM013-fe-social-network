import { createUserAccount } from '../src/firebase/autentication.js';
// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('createUserAccount', () => {
  it('should be a function', () => {
    expect(typeof createUserAccount).toBe('function');
  });
  it('Debería poder iniciar sesion', () => {
    createUserAccount('front@end.la', '123456')
      .then((user) => {
        expect(user.email).toBe('front@end.la');
      });
  });
});

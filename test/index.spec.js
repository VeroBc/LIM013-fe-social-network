import { createUserAccount, signinUserAccount, signInWithGoogle } from '../src/firebase/autentication.js';
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
  it('should be able to create a user account', () => {
    createUserAccount('front@end.la', '123456')
      .then((user) => {
        expect(user.email).toBe('front@end.la');
      });
  });
});
describe('signinUserAccount', () => {
  it('should be a function', () => {
    expect(typeof signinUserAccount).toBe('function');
  });
  it('should be able to login', () => {
    signinUserAccount('front@end.la', '123456')
      .then((user) => {
        expect(user.email).toBe('front@end.la');
      });
  });
});

describe('signInWithGoogle', () => {
  it('should be a function', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  it('should be able to login with Google', () => {
    signInWithGoogle('front@end.la')
      .then((user) => {
        expect(user.email).toBe('front@end.la');
      });
  });
});

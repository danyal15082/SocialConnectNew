jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        delete: jest.fn(),
      })),
    })),
  })),
  FieldValue: {
    serverTimestamp: jest.fn(() => 'server-timestamp'),
  },
}));

const {buildFollowDocId} = require('../src/services/followService');

describe('follow service helpers', () => {
  it('builds a stable Firestore document id for a follow relationship', () => {
    expect(buildFollowDocId('user-1', 'user-2')).toBe('user-1_user-2');
  });
});

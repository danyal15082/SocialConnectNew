import firestore from '@react-native-firebase/firestore';

export const buildFollowDocId = (followerId, followingId) => `${followerId}_${followingId}`;

export const toggleFollowRelationship = async ({followerId, followingId, currentStatus}) => {
  if (!followerId || !followingId || followerId === followingId) {
    return {success: false, error: 'Invalid follow request'};
  }

  const docId = buildFollowDocId(followerId, followingId);
  const ref = firestore().collection('follows').doc(docId);

  if (currentStatus) {
    await ref.delete();
    return {success: true, following: false};
  }

  await ref.set({
    followerId,
    followingId,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  return {success: true, following: true};
};

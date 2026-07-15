import firestore from '@react-native-firebase/firestore';

export const buildConversationKey = (userA, userB) => {
  const ids = [userA, userB].filter(Boolean);
  return ids.sort().join('_');
};

export const sendMessage = async ({senderId, receiverId, text}) => {
  if (!senderId || !receiverId || !text?.trim()) {
    return {success: false, error: 'Missing message details'};
  }

  const conversationId = buildConversationKey(senderId, receiverId);

  await firestore().collection('messages').add({
    conversationId,
    senderId,
    receiverId,
    text: text.trim(),
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  return {success: true};
};

export const subscribeToConversation = ({senderId, receiverId, onUpdate}) => {
  if (!senderId || !receiverId) {
    return () => {};
  }

  const conversationId = buildConversationKey(senderId, receiverId);

  return firestore()
    .collection('messages')
    .onSnapshot(snapshot => {
      const items = snapshot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .filter(item => item.conversationId === conversationId)
        .sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() || 0;
          const bTime = b.createdAt?.toMillis?.() || 0;
          return aTime - bTime;
        });

      onUpdate(items);
    });
};

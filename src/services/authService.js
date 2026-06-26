let authModule;

const getAuth = () => {
  if (!authModule) {
    authModule = require('@react-native-firebase/auth');
  }

  const auth = authModule.default ?? authModule;
  return auth();
};

export const signup = async (name, email, password) => {
  const credential =
    await getAuth().createUserWithEmailAndPassword(
      email,
      password,
    );

  await credential.user.updateProfile({
    displayName: name,
  });

  await credential.user.reload();

  return credential;
};

export const login = (email, password) => {
  return getAuth().signInWithEmailAndPassword(
    email,
    password,
  );
};

export const logout = () => {
  return getAuth().signOut();
};

export const forgotPassword = email => {
  return getAuth().sendPasswordResetEmail(email);
};
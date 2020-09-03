import { auth } from "../services/firebase";

export function signUp(email, password, displayName) {
  auth()
    .createUserWithEmailAndPassword(email.trim(), password)
    .then((res) => {
      const user = auth().currentUser;
      return user.updateProfile({
        displayName: displayName,
      });
    });
}

export function signIn(email, password) {
  return auth().signInWithEmailAndPassword(email.trim(), password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logout() {
  return auth().signOut();
}

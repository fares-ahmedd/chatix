import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createUser(auth, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // const user = userCredential.user;
    return userCredential;
  } catch (_) {
    return null;
    // Handle error here
  }
}

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
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

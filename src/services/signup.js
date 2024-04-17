import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createUser(auth, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    return error.message;
    // Handle error here
  }
}

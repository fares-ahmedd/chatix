import { useState } from "react";
import { MAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../../utils/regex";

const initialState = {
  isEditingName: false,
  isEditingEmail: false,
  isEditingPassword: false,
};

export default function useSignup({ email, password, name }) {
  const [{ isEditingName, isEditingEmail, isEditingPassword }, setEditsValues] =
    useState(initialState);
  const invalidEmail = !MAIL_REGEX.test(email.trim()) && isEditingEmail;
  const invalidPassword =
    !PASSWORD_REGEX.test(password.trim()) && isEditingPassword;
  const invalidName = !NAME_REGEX.test(name.trim()) && isEditingName;

  return { setEditsValues, invalidEmail, invalidPassword, invalidName };
}

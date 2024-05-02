import { WritableComputedRef } from "vue";

export interface ISignUpStateRef {
  email: WritableComputedRef<string>;
  name: WritableComputedRef<string>;
  password: WritableComputedRef<string>;
  repeatPassword: WritableComputedRef<string>;
}

export default function useValidationErrorMsg({
  email,
  name,
  password,
  repeatPassword,
}: ISignUpStateRef) {
  const getValidationError = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.value) {
      return "Email can not be empty!";
    } else if (!emailRegex.test(email.value)) {
      return "Email you have entered is invalid!";
    }

    const nameRegex = /^(?=.{3,16}$)[A-Za-z][a-z]+$/;

    if (!name.value) {
      return "Name can not be empty!";
    } else if (!nameRegex.test(name.value)) {
      return "Name can only contain from 3 to 16 letters and only first letter can be uppercase.";
    }

    if (password.value.length < 8) {
      return "Password can not be shorter than 8 characters!";
    } else if (password.value.length > 28) {
      return "Password can not be longer than 28 characters!";
    } else if (password.value !== repeatPassword.value) {
      return "The entered passwords do not match!";
    }

    return null;
  };

  return { getValidationError };
}

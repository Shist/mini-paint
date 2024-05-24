import { Ref } from "vue";

export interface ISignUpStateRef {
  email: Ref<string>;
  name: Ref<string>;
  password: Ref<string>;
  repeatPassword: Ref<string>;
}

export default function useValidationErrorMsg() {
  const getSignUpValidationError = ({
    email,
    name,
    password,
    repeatPassword,
  }: ISignUpStateRef) => {
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

  const getDescriptionValidationError = (description: string) => {
    if (!description) {
      return "Description can not be empty!";
    } else if (description.length > 512) {
      return "Description can not be longer than 512 characters!";
    }

    return null;
  };

  return { getSignUpValidationError, getDescriptionValidationError };
}

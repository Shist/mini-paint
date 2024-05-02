export interface IFirebaseError extends Error {
  code: string;
}

export default function useFirebaseErrorMsg() {
  const getErrorMsg = (error: IFirebaseError | Error) => {
    if (!("code" in error)) {
      return error.message;
    }
    switch (error.code) {
      case "auth/invalid-email":
        return "The email you provided is not registered.";
      case "auth/missing-password":
        return "You have not specified a password.";
      case "auth/invalid-credential":
        return "The credentials you provided are incorrect. Double-check provided email and password.";
      case "auth/email-already-in-use":
        return "The email you specified has already been registered. Log in or register another one.";
      default:
        return error.message;
    }
  };

  return { getErrorMsg };
}

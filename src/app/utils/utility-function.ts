import validator from "validator";

export const validatePhoneNumber = (phoneNumber: string) => {
  const number = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
  return validator.isMobilePhone(number, "any", {
    strictMode: true,
  });
};

export const validateEmail = (email: string) => {
  return validator.isEmail(email);
};

export const isEmpty = (str: string) => {
  return validator.isEmpty(str, { ignore_whitespace: true });
};

export const getIntialials = (
  firstname: string | undefined,
  lastname: string | undefined
): string => {
  return (
    (firstname?.charAt(0).toUpperCase() ?? "") +
    (lastname?.charAt(0).toUpperCase() ?? "")
  );
};

export function getValueFromFormData<T>(
  form: FormData,
  key: string
): T | undefined {
  const val = form.get(key);
  if (val) return val as T;
  return undefined;
}

export function getAllValueFromFormData<T>(
  form: FormData,
  key: string
): T | undefined {
  const val = form.getAll(key);
  if (val) return val as T;
  return undefined;
}

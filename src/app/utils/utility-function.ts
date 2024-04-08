import validator from "validator";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

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

export const formattedAMPMTime = (timeString: string) => {
  console.log('timeString', timeString)
  const [timePart, secondsPart] = timeString.split(':');
  const [hours, minutes] = timePart.split(':').map(Number);

  if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      let ampm = 'AM';
      let hours12 = hours;

      if (hours >= 12) {
          ampm = 'PM';
          if (hours > 12) {
              hours12 = hours - 12;
          }
      }
      if (hours12 === 0) {
          hours12 = 12;
      }

      const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      return formattedTime;
  } else {
      // Assuming seconds are optional and can be ignored
      const [hours, minutes] = timeString.split(':').map(Number);

      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          let ampm = 'AM';
          let hours12 = hours;

          if (hours >= 12) {
              ampm = 'PM';
              if (hours > 12) {
                  hours12 = hours - 12;
              }
          }
          if (hours12 === 0) {
              hours12 = 12;
          }

          const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
          return formattedTime;
      } else {
          console.error('Invalid time format:', timeString);
          return null; // Or any other error handling logic
      }
  }
};


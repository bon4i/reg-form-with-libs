export const EMAIL_REGEXP = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
export const PASS_REGEXP = /(?=.*[0-9])(?=.*[a-z])/g;
export const emailErrors = {
    formatError: 'Неверная почта. Данные должны быть в формате @email.ru!',
    maxLengthError: 'Неверная почта. Должно быть не больше 30 символов!',
    minLengthError: 'Неверная почта. Должно быть не меньше 3 символов!',
};
export const passwordErrors = {
    formatError:
        'Пароль должен содержать хотя-бы одно число и хотя-бы одну латинскую букву в нижнем регистре',
    minLengthError: 'Слишком легкий пароль. Пароль должен быть не короче 6 символов!',
    checkPasswordError: 'Введенные пароли не совпадают!',
};
export const sendFormData = (formData) => {
    console.log(formData);
};

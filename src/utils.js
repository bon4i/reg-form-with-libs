import * as yup from 'yup';

export const sendFormData = (formData) => {
    console.log(formData);
};

export const emailChangeSchema = yup
    .string()
    .matches(
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        'Неверная почта. Данные должны быть в формате @email.ru!',
    );

export const emailBlurSchema = yup
    .string()
    .min(3, 'Неверная почта. Должно быть не меньше 3 символов!');

export const passwordChangeSchema = yup
    .string()
    .matches(
        /(?=.*[0-9])(?=.*[a-z])/g,
        'Пароль должен содержать хотя-бы одно число и хотя-бы одну латинскую букву в нижнем регистре',
    );

export const passwordBlurSchema = yup
    .string()
    .min(6, 'Слишком легкий пароль. Пароль должен быть не короче 6 символов!');

export const validateAndGetErrorMessage = (schema, value) => {
    let errorMessage = null;
    try {
        schema.validateSync(value, { aboutEarly: false });
    } catch ({ errors }) {
        errorMessage = errors.join('\n');
    }
    return errorMessage;
};

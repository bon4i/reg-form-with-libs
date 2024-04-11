import React from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { InputField } from './components/InputField/InputField';

const fieldsScheme = yup.object()
	.shape({
		email: yup
		.string()
			.matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
			'Неверная почта. Данные должны быть в формате @email.ru!')
			.min(3, 'Неверная почта. Должно быть не меньше 3 символов!'),
		password: yup
			.string()
			.matches(/(?=.*[0-9])(?=.*[a-z])/g,
			'Пароль должен содержать хотя-бы одно число и хотя-бы одну латинскую букву в нижнем регистре')
			.min(6, 'Слишком легкий пароль. Пароль должен быть не короче 6 символов!'),
		confirmedPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Введенные пароли не совпадают'),
	});

export const App = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmedPassword: '',
		},
		mode: 'onChange',
		resolver: yupResolver(fieldsScheme),
	});

	const checkError = (errors) => {
		let errorMessage = null;
		switch (errorMessage) {
			case errors.email:
				errorMessage = errors.email?.message;
			break;
			case errors.password:
				errorMessage = errors.password?.message;
			break;
			case errors.confirmedPassword:
				errorMessage = errors.confirmedPassword?.message;
			break;
			default:
			break;
		};
	}

	const submitForm = (formData) => {
		console.log(formData);
		reset();
	}

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<p className={styles.title}>Регистрация</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit(submitForm)}>
				<InputField
					label={'Почта'}
					type={'text'}
					name={'email'}
					placeholder='Введите адрес ящика в формате @example.ru'
					{...register('email')}
				/>
				<InputField
					label={'Пароль'}
					type={'password'}
					name={'password'}
					placeholder='Введите пароль'
					{...register('password')}
				/>
				<InputField
					label={'Повторите пароль'}
					type={'password'}
					name={'confirmedPassword'}
					placeholder='Повторите пароль'
					{...register('confirmedPassword')}
				/>
				<div className={styles.error}>{checkError(errors)}</div>
				<button type='submit'>
					Зарегистроваться
				</button>
			</form>
		</div>
	);
};

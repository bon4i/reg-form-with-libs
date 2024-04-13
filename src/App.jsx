import React, { useEffect, useRef } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';

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
	const submitButtonRef = useRef(null);
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
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
		if (errors.email) {
			errorMessage = errors.email?.message;
		} else if (errors.password) {
			errorMessage = errors.password?.message;
		} else if (errors.confirmedPassword) {
			errorMessage = errors.confirmedPassword?.message;
		}
		return errorMessage;
	}

	const submitForm = (formData) => {
		console.log(formData);
	}

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	  });

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<p className={styles.title}>Регистрация</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit(submitForm)}>
				<div className={styles['register-form']}>
					<label htmlFor='email' className={styles.label}>Почта</label>
					<input
						className={styles.input}
						id='email'
						type='email'
						placeholder='Введите адрес ящика в формате @example.ru'
						autoComplete="off"
						{...register('email')}
					/>
				</div>
				<div className={styles['register-form']}>
					<label htmlFor='password' className={styles.label}>Пароль</label>
					<input
						className={styles.input}
						id='password'
						type='password'
						placeholder='Введите пароль'
						autoComplete="off"
						{...register('password')}
					/>
				</div>
				<div className={styles['register-form']}>
					<label htmlFor='confirmedPassword' className={styles.label}>Повторите пароль</label>
					<input
						className={styles.input}
						id='confirmedPassword'
						type='password'
						placeholder='Повторите пароль'
						{...register('confirmedPassword')}
						autoComplete="off"
					/>
				</div>
				<div className={styles.error}>{checkError(errors)}</div>
				<button type='submit' disabled={!isValid} ref={submitButtonRef}>
					Зарегистроваться
				</button>
			</form>
		</div>
	);
};

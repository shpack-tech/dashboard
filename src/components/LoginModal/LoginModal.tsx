import React, { useEffect, useState } from 'react';
import { LOGIN_MUTATION } from '../../GraphQL/Mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthContext';

import './loginModal.scss';

const LoginModal: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorText, setErrorText] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [login, { error, data, loading }] = useMutation(LOGIN_MUTATION);
	const { token, setToken } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (data) {
			localStorage.setItem('userToken', data.login.token);
			setToken(data.login.token);
			navigate('/dashboard');
		}
		if (error) {
			error.message === "User Doesn't Exists!"
				? setErrorText('Такого пользователя нет!')
				: error.message === 'Wrong Password!'
				? setErrorText('Неверный пароль!')
				: setErrorText('Произошла ошибка, попробуйте позже');
		}
		setIsLoading(loading);
	}, [data, loading]);

	const handleLogin = (): void => {
		login({
			variables: {
				username: username,
				password: password,
			},
		});
	};

	return (
		<div className="login_modal">
			<h1 className="login_modal__title">Войти</h1>
			<p className="login_modal__description">Уникальная технология доступна для вашего бизнеса прямо сейчас</p>
			<p className="login_modal__error">{errorText}</p>
			<form
				className="login_modal__form"
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
			>
				<input
					type="text"
					required
					name="login"
					placeholder="Логин"
					className="login_modal__form__input"
					onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setUsername(e.target.value);
					}}
				/>
				<input
					type="password"
					required
					name="password"
					autoComplete="on"
					placeholder="Пароль"
					className="login_modal__form__input"
					onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setPassword(e.target.value);
					}}
				/>
				<button type="submit" className="login_modal__form__button">
					Войти
				</button>
			</form>
			{isLoading ? (
				<div className="preloader">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				''
			)}
		</div>
	);
};
export default LoginModal;

import React, { useContext } from 'react';
import { useAuthContext } from '../../AuthContext';

import logo from '../../assets/logo.png';

import './header.scss';

const Header: React.FC = () => {
	const { token, setToken } = useAuthContext();

	const handleLogout = (): void => {
		localStorage.removeItem('userToken');
		setToken(null);
	};

	return (
		<nav className="header">
			<div className="header__logo">
				<img src={logo} alt="dashboard app" />
			</div>
			<div className="header__account-action">
				{token && token.length > 0 ? <button onClick={handleLogout}>Выйти</button> : <p>Войдите в приложение</p>}
			</div>
		</nav>
	);
};

export default Header;

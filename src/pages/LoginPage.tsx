import React from 'react';
import LoginModal from '../components/LoginModal/LoginModal';
const LoginPage: React.FC = () => {
	return (
		<div className="body_overlay">
			<LoginModal />
		</div>
	);
};

export default LoginPage;

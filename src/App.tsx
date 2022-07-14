import React, { lazy, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header/Header';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const App: React.FC = () => {
	const link = new HttpLink({ uri: 'https://gravitel-graphql-backend.herokuapp.com/graphql' });
	const [token, setToken] = useState<string | null>(localStorage.getItem('userToken' || null));

	const authLink = setContext((_, { headers }) => {
		const authToken: string | null = token;
		return {
			headers: {
				...headers,
				authorization: authToken ? `Bearer ${authToken}` : '',
			},
		};
	});

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(link),
	});

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={{ token, setToken }}>
				<Header />
				<Routes>
					<Route path="/" element={!token ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
					<Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
					<Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
				</Routes>
			</AuthContext.Provider>
		</ApolloProvider>
	);
};

export default App;

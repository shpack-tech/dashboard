import { createContext, useContext } from 'react';
export type AuthType = {
	token: string | null;
	setToken: (s: string | null) => void;
};
export const AuthContext = createContext<AuthType>({
	token: null,
	setToken: () => {},
});
export const useAuthContext = () => useContext(AuthContext); // Чтобы не обращаться к локальному хранилищу все время

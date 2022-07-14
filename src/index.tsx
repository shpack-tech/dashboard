import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';

import './index.scss';
const history = createHistory();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Suspense fallback={<div>Загрузка...</div>}>
			<Router>
				<App />
			</Router>
		</Suspense>
	</React.StrictMode>
);

reportWebVitals();

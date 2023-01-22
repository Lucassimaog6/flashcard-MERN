import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Deck from './Deck';
import './global.css';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/decks/:deck_id',
		element: <Deck />,
	},
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

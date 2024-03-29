import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
// import { auth } from '../api/config.js';
// import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { NavBar } from '../components';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	// const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>SwiftShop</h1>

					<NavBar />

					<main className="Layout-main">
						<Outlet />
					</main>
				</header>
			</div>
		</>
	);
}

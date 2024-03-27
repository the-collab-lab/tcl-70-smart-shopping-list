import { Outlet, NavLink } from 'react-router-dom';

import Button from '@mui/material/Button';

import './Layout.css';
// import { auth } from '../api/config.js';
// import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import NavBar from './Navbar.jsx';

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
				</header>

				<NavBar />

				<main className="Layout-main">
					<Outlet />
				</main>
				{/* <nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/" className="Nav-link">
							<Button>Home</Button>
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							<Button>List</Button>
						</NavLink>
						<NavLink to="/manage-list" className="Nav-link">
							<Button>Manage List</Button>
						</NavLink>
					</div>
				</nav> */}
			</div>
		</>
	);
}

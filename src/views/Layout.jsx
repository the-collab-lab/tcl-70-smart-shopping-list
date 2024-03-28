import { Outlet, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './Layout.css';
import { auth } from '../api/config.js';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
					{!!user ? (
						<span>
							<p>Signed in as {user.displayName}</p>
							<SignOutButton />
						</span>
					) : (
						<SignInButton />
					)}
				</header>

				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
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
				</nav>
			</div>
		</>
	);
}

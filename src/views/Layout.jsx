import { Outlet, NavLink } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';

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
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
					rel="stylesheet"
				/>
			</head>
			<div className="Layout">
				<header className="Layout-header">
					<img src="/img/SwiftShopBird.png" alt="" />
					<h1>
						<span className="swift-header">Swift</span>
						<span className="shop-header">shop</span>
					</h1>

					{/* For use later
					<svg viewBox="0 0 500 500" >
						<path
							id="curve"
							d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
							fill='transparent'
						/>
						<text width={500}>
							<textPath xlinkHref="#curve" className='shop-header'>
								shop
							</textPath>
						</text>
					</svg> */}
				</header>
				<NavBar />
				<main className="Layout-main">
					<Outlet />
				</main>
			</div>
		</>
	);
}

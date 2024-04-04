import { Outlet } from 'react-router-dom';

import './Layout.css';
// import { auth } from '../api/config.js';
// import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { NavBar } from '../components';

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<img src="/img/SwiftShopBird.png" alt="" />
					<h1>
						<p className="swift-header">Swift</p>
						<p className="shop-header">shop</p>
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

import { Outlet } from 'react-router-dom';
import { useThemeContext } from '../components/ThemeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton } from '@mui/material';
import './Layout.css';

import { NavBar } from '../components';

export function Layout() {
	const { toggleColorMode, mode } = useThemeContext();
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<IconButton
						onClick={toggleColorMode}
						color="inherit"
						aria-label="toggle theme"
						edge="end"
						sx={{
							display: { sm: 'flex', md: 'none' },
							alignSelf: 'end',
							padding: '20px',
						}}
					>
						{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
					<div className="Layout-header-content">
						<img src="/img/SwiftShopBird.png" alt="" />
						<h1>
							<p className="swift-header">Swift</p>
							<p className="shop-header">shop</p>
						</h1>
					</div>
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

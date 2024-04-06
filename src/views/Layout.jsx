import { Outlet } from 'react-router-dom';
// import SvgIcon from '@mui/material/SvgIcon';

import { useThemeContext } from '../components/ThemeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton, Grid } from '@mui/material';

import './Layout.css';

// import { auth } from '../api/config.js';
// import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

import { NavBar } from '../components';
import { Box } from '@mui/material';

export function Layout() {
	const { toggleColorMode, mode } = useThemeContext();
	return (
		<Box
			sx={{
				backgroundImage: (theme) => {
					return theme.palette.mode === 'dark'
						? 'url("/img/main-background-image-darkmode.png")'
						: 'url("/img/main-background-image.png")';
				},
			}}
		>
			<div className="Layout">
				<header className="Layout-header">
					<Grid container>
						<Grid item xs={1}>
							{' '}
						</Grid>
						<Grid
							item
							xs={10}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<img src="/img/SwiftShopBird.png" alt="" />
							<h1>
								<p className="swift-header">Swift</p>
								<p className="shop-header">shop</p>
							</h1>
						</Grid>
						<Grid
							item
							xs={1}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<IconButton
								onClick={toggleColorMode}
								color="inherit"
								aria-label="toggle theme"
								edge="end"
								sx={{
									display: { sm: 'flex', md: 'none' },
									alignSelf: 'start',
									justifySelf: 'end',
								}}
							>
								{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
							</IconButton>
						</Grid>
					</Grid>
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
		</Box>
	);
}

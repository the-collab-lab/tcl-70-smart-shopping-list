import * as React from 'react';
import { useState } from 'react';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import { useThemeContext } from './ThemeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export function NavBar() {
	const { user } = useAuth();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const { toggleColorMode, mode } = useThemeContext();

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const [value, setValue] = React.useState('/');

	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: '#003780', color: '#fdeecd' }}
		>
			<Container maxWidth="xl" className="nav-bar">
				<Toolbar variant="dense" disableGutters>
					{/*Logo and app name for medium or larger screens*/}
					<SvgIcon
						sx={{
							fontSize: '20px',
							display: { xs: 'none', md: 'flex' },
							mr: 1,
						}}
					>
						<svg
							height="200px"
							width="200px"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 290.87 290.87"
							xmlSpace="preserve"
							fill="#000"
							transform="scale(-1 1)"
							stroke="#000"
							strokeWidth={0.00290873}
						>
							<g fill="#010002">
								<path d="M44.268 139.532L44.268 79.35 44.268 41.049 93.507 90.294z" />
								<path d="M0 73.384L32.334 41.049 32.334 73.384z" />
								<path d="M149.583 249.824L113.508 213.748 149.583 181.843z" />
								<path d="M103.066 202.799L47.216 153.823 160.968 48.77 290.873 48.77z" />
							</g>
						</svg>
					</SvgIcon>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						SwiftShop
					</Typography>
					{/* nav links for larger screens */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<NavLink to="/" className="Nav-link">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Home
							</Button>
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								List
							</Button>
						</NavLink>
						<NavLink to="/manage-list" className="Nav-link">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Manage List
							</Button>
						</NavLink>
					</Box>

					{/* app logo for small screens */}
					<SvgIcon
						sx={{
							fontSize: '20px',
							display: { xs: 'flex', md: 'none' },
							mr: 1,
						}}
					>
						<svg
							height="200px"
							width="200px"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 290.87 290.87"
							xmlSpace="preserve"
							fill="#000"
							transform="scale(-1 1)"
							stroke="#000"
							strokeWidth={0.00290873}
						>
							<g fill="#010002">
								<path d="M44.268 139.532L44.268 79.35 44.268 41.049 93.507 90.294z" />
								<path d="M0 73.384L32.334 41.049 32.334 73.384z" />
								<path d="M149.583 249.824L113.508 213.748 149.583 181.843z" />
								<path d="M103.066 202.799L47.216 153.823 160.968 48.77 290.873 48.77z" />
							</g>
						</svg>
					</SvgIcon>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						SwiftShop
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							flexDirection: 'row',
							display: { xs: 'flex', md: 'none' },
							justifyContent: 'end',
						}}
					>
						{!!user ? (
							<Typography>
								Signed in as {user.displayName} <SignOutButton />
							</Typography>
						) : (
							<SignInButton />
						)}
					</Box>
					{/* nav links for smaller screens */}

					{/* username and signin/signout button for larger screens */}
					<Box
						sx={{
							flexGrow: 1,
							flexDirection: 'row',
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'end',
						}}
					>
						{!!user ? (
							<Typography>
								Signed in as {user.displayName} <SignOutButton />
							</Typography>
						) : (
							<SignInButton />
						)}
					</Box>
					<IconButton
						onClick={toggleColorMode}
						color="inherit"
						aria-label="toggle theme"
						edge="end"
					>
						{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
				</Toolbar>

				{/* username and signin/signout button for smaller screens */}
			</Container>
			<Paper
				sx={{
					display: { xs: 'flex', md: 'none' },
					justifyContent: 'space-around',
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
				}}
				elevation={3}
			>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					sx={{ width: '100%' }}
				>
					<BottomNavigationAction
						label="Home"
						icon={<RestoreIcon />}
						component={NavLink}
						to="/"
					/>
					<BottomNavigationAction
						label="List"
						icon={<FavoriteIcon />}
						component={NavLink}
						to="/list"
					/>
					<BottomNavigationAction
						label="About"
						icon={<ArchiveIcon />}
						component={NavLink}
						to="/manage-list"
					/>
				</BottomNavigation>
			</Paper>
		</AppBar>
	);
}
// end of nav

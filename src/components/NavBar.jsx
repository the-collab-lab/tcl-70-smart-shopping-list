import * as React from 'react';
import { useState } from 'react';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import { useThemeContext } from './ThemeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton } from '@mui/material';

export function NavBar() {
	const { user } = useAuth();
	const { toggleColorMode, mode } = useThemeContext();

	const [value, setValue] = useState('/');

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
					{user && (
						<>
							{/* nav links for larger screens */}
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								<NavLink to="/" className="Nav-link">
									<Button sx={{ my: 2, color: 'white', display: 'block' }}>
										Home
									</Button>
								</NavLink>
								<NavLink to="/list" className="Nav-link">
									<Button sx={{ my: 2, color: 'white', display: 'block' }}>
										List
									</Button>
								</NavLink>
								<NavLink to="/manage-list" className="Nav-link">
									<Button sx={{ my: 2, color: 'white', display: 'block' }}>
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
								<Typography>Signed in as {user.displayName}</Typography>
								<SignOutButton />
							</Box>
						</>
					)}
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
						{!!user && (
							<Typography>
								Signed in as {user.displayName} <SignOutButton />
							</Typography>
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
			{user && (
				<Paper
					sx={{
						display: { xs: 'flex', md: 'none' },
						justifyContent: 'space-around',
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 1,
						backgroundColor: '#003780',
						color: '#fdeecd',
					}}
					elevation={3}
				>
					<BottomNavigation
						showLabels
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						sx={{
							width: '100%',
							backgroundColor: '#003780',
							color: '#fdeecd',
						}}
					>
						<BottomNavigationAction
							label="Home"
							icon={<HomeIcon fontSize="large" />}
							component={NavLink}
							to="/"
							sx={{ color: '#fdeecd' }}
						/>
						<BottomNavigationAction
							label="List"
							icon={<ChecklistIcon fontSize="large" />}
							component={NavLink}
							to="/list"
							sx={{ color: '#fdeecd' }}
						/>
						<BottomNavigationAction
							label="About"
							icon={<InfoIcon fontSize="large" />}
							component={NavLink}
							to="/manage-list"
							sx={{ color: '#fdeecd' }}
						/>
					</BottomNavigation>
				</Paper>
			)}
		</AppBar>
	);
}
// end of nav

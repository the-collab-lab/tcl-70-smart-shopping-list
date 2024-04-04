import * as React from 'react';
import { useState } from 'react';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import './NavBar.css';
import { LogoIcon } from '../../public/svg-icons.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
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
			sx={{ backgroundColor: '#003780', color: '#fdeecd', mb: '20px' }}
		>
			<Container maxWidth="xl" className="nav-bar">
				<Toolbar variant="dense" disableGutters>
					{/*Logo and app name for medium or larger screens*/}
					<LogoIcon />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							ml: 1,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'Newsreader',
							fontWeight: 700,
							fontStyle: 'italic',
							letterSpacing: '.3rem',
							color: '#FDEECD',
							textDecoration: 'none',
						}}
						className="nav-app-name"
					>
						Swift Shop
					</Typography>
					{user && (
						<>
							{/* nav links for larger screens */}
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								<NavLink to="/" className="nav-link">
									<Button className="nav-button">Home</Button>
								</NavLink>
								<NavLink to="/list" className="nav-link">
									<Button className="nav-button">List</Button>
								</NavLink>
								<NavLink to="/about" className="nav-link">
									<Button className="nav-button">About</Button>
								</NavLink>
							</Box>

							{/* app logo for small screens */}

							<Typography
								variant="h5"
								noWrap
								component="a"
								href="/"
								sx={{
									mr: 2,
									ml: 1,
									display: { xs: 'flex', md: 'none' },
									flexGrow: 1,
									fontFamily: 'Newsreader',
									fontStyle: 'italic',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
									fontSize: '1.2rem',
								}}
							>
								Swift Shop
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
							<Typography sx={{ fontSize: '1.2rem' }}>
								Signed in as <b>{user.displayName}</b> <SignOutButton />
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
							to="/about"
							sx={{ color: '#fdeecd' }}
						/>
					</BottomNavigation>
				</Paper>
			)}
		</AppBar>
	);
}
// end of nav

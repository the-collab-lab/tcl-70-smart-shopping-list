import * as React from 'react';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
	const { user } = useAuth();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/*Logo and app name for medium or larger screens*/}
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
						LOGO
					</Typography>

					{/* app logo for small screens */}
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
						LOGO
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

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to="/" className="Nav-link">
									<Typography textAlign="center">Home</Typography>
								</NavLink>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to="/list" className="Nav-link">
									<Typography textAlign="center">List</Typography>
								</NavLink>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to="/manage-list" className="Nav-link">
									<Typography textAlign="center">Manage List</Typography>
								</NavLink>
							</MenuItem>
						</Menu>
					</Box>

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
				</Toolbar>
				<Toolbar sx={{ display: { xs: 'flex', md: 'none' } }}>
					<Box
						sx={{
							flexGrow: 1,
							flexDirection: 'row',
							display: { xs: 'none', md: 'flex' },
						}}
					>
						<Typography>
							Signed in as <Button sx={{ color: 'white' }}>Sign out</Button>
						</Typography>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default NavBar;

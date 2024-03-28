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
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';

function NavBar() {
	const { user } = useAuth();
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
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
					{/* nav links for smaller screens */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
							justifyContent: 'end',
						}}
					>
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
				</Toolbar>

				{/* username and signin/signout button for smaller screens */}
				<Toolbar
					variant="dense"
					disableGutters
					sx={{ display: { xs: 'flex', md: 'none' }, padding: 0 }}
				>
					<Box
						sx={{
							flexGrow: 1,
							flexDirection: 'row',
							display: { xs: 'flex', md: 'none' },
							justifyContent: 'start',
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
			</Container>
		</AppBar>
	);
}
export default NavBar;

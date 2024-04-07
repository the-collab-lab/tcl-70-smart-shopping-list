import { useEffect, useRef, useState } from 'react';
import { createList } from '../api/firebase';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { SignInButton } from '../api/useAuth';
import { SingleList } from '../components/SingleList';
import './Home.css';

export function Home({ data, setListPath, userEmail, userId }) {
	const [shoppingListName, setShoppingListName] = useState('');
	const [notificationMessage, setNotificationMessage] = useState('');
	const previousDataRef = useRef([]);
	const isLargeScreen = useMediaQuery((theme) => {
		return theme.breakpoints.up('lg');
	});

	useEffect(() => {
		const newestList = data[data.length - 1];
		setListPath(newestList?.path);
		return () => {
			previousDataRef.current = data;
		};
	}, [data, setListPath]);

	const handleOnChange = (event) => {
		setShoppingListName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const names = data.map((list) => {
				return list.name;
			});

			if (names.includes(shoppingListName)) {
				throw new Error('Name should be unique');
			}

			await createList(userId, userEmail, shoppingListName);
			setShoppingListName('');
			setNotificationMessage(`${shoppingListName} is added to the list!`);
		} catch (error) {
			setNotificationMessage(error.message);
			console.log('submit error: ', error);
		}
	};

	return (
		<div className="Home">
			{!userId ? (
				<Container
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100vw',
						m: '25px 0',
					}}
				>
					<Box
						className="welcome-card"
						sx={{
							border: (theme) => {
								return theme.palette.mode === 'dark'
									? '1.5px solid #f8f9fa'
									: '1.5px solid #003780';
							},
						}}
					>
						<Typography
							variant="h4"
							component="h2"
							gutterBottom
							sx={{ textAlign: 'center' }}
						>
							Welcome to{' '}
							<p
								style={{
									fontFamily: 'Newsreader',
									fontStyle: 'italic',
									fontSize: '4rem',
									margin: '10px',
								}}
							>
								Swift Shop
							</p>
						</Typography>
						<Typography variant="h5" sx={{ mb: '10px' }}>
							Click the button below to get started
						</Typography>
						<SignInButton />
						<Link
							href="/about"
							underline="always"
							sx={{
								margin: '10px',
								color: '#f8f9fa',
								textDecoration: 'underline',
								fontSize: '1.2rem',
							}}
						>
							{'Learn more about this app'}
						</Link>
					</Box>
				</Container>
			) : (
				<div>
					<br></br>
					<details>
						<summary>Quick Guide:</summary>
						<ul>
							<li>Click on the list name to redirect to items in the list.</li>
							<li>
								(If you are the list owner) Click on "Share this list" to share
								the list with others.
							</li>
						</ul>
					</details>
					<br></br>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
							padding: '20px',
							color: (theme) =>
								theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780',
							borderColor: (theme) =>
								theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780',
							borderStyle: 'solid',
							borderWidth: '1px',
							backgroundColor: (theme) =>
								theme.palette.mode === 'dark' ? '#003780' : '#f8f9fa',
						}}
						noValidate
						autoComplete="off"
					>
						<Stack
							direction="row"
							spacing={2}
							alignItems="center"
							justifyContent="center"
						>
							<InputLabel
								htmlFor="shopping-list-name"
								size="normal"
								sx={{
									color: (theme) =>
										theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780',
									backgroundColor: (theme) =>
										theme.palette.mode === 'dark' ? '#003780' : '#f8f9fa',
									fontSize: '2rem',
								}}
							>
								Enter new list name:
							</InputLabel>
							<Input
								type="text"
								name="shopping-list-name"
								id="shopping-list-name"
								onChange={handleOnChange}
								value={shoppingListName}
								placeholder="Add list"
								className="input-button-common"
								sx={{
									input: {
										fontSize: '1.5rem',
										'&::placeholder': {
											color: (theme) =>
												theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780',
											fontSize: '1.5rem',
											opacity: '0.7',
										},
									},
								}}
							/>
							<Button
								type="submit"
								disabled={shoppingListName.length === 0}
								sx={{
									color: (theme) =>
										theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780',
									borderColor: (theme) =>
										theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780',
									borderStyle: 'solid',
									borderWidth: '1px',
									backgroundColor: (theme) =>
										theme.palette.mode === 'dark' ? '#003780' : '#f8f9fa',
									fontSize: '1.5rem',
									margin: '10px',
								}}
							>
								Submit
							</Button>
						</Stack>
						{notificationMessage && (
							<p className="notification-message" title={notificationMessage}>
								{notificationMessage}
							</p>
						)}
					</Box>
					<ul className="lists-container">
						<Grid
							container
							spacing={2}
							paddingX={(theme) => {
								return isLargeScreen ? theme.spacing(12) : undefined;
							}}
						>
							{data.map((list) => (
								<Grid key={list.name} item display="flex" xs={6} md={4}>
									<SingleList
										key={list.name}
										name={list.name}
										path={list.path}
										userId={userId}
										setListPath={setListPath}
									/>
								</Grid>
							))}
						</Grid>
					</ul>
				</div>
			)}
		</div>
	);
}

import './Home.css';
import { SingleList } from '../components/SingleList';
import { useEffect, useState, useRef } from 'react';
import { createList } from '../api/firebase';
import {
	InputLabel,
	Input,
	Box,
	Button,
	Stack,
	Grid,
	Typography,
} from '@mui/material';
import { SignInButton } from '../api/useAuth';
import { useMediaQuery } from '@mui/material';

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
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					minHeight="100vh"
					sx={{
						mt: '10vh',
						boxSizing: 'border-box',
					}}
				>
					<Typography variant="h4" component="h1" gutterBottom>
						Welcome to Swift Shop! Sign in with below button to shop.
					</Typography>
					<SignInButton />
				</Box>
			) : (
				<div>
					<br></br>
					<details>
						<summary>Quick Guide:</summary>
						<ul>
							<li>Click on the list name to redirect to items in the list.</li>
							<li>
								(If you are the list owner) Click on the edit icon to modify the
								list name.
							</li>
							<li>
								(If you are the list owner) Click on the share icon to share the
								list with others.
							</li>
						</ul>
					</details>
					<br></br>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							'& .MuiTextField-root': { m: 1, width: '25ch' },
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
								// className="centered-block"
							>
								Enter new list name::
							</InputLabel>
							<Input
								type="text"
								name="shopping-list-name"
								id="shopping-list-name"
								onChange={handleOnChange}
								value={shoppingListName}
								placeholder="Add list"
								className="input-button-common"
							/>
							<Button type="submit" disabled={shoppingListName.length === 0}>
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

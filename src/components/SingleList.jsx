import { useEffect, useState } from 'react';
import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import icons from '../utils/icons.js';
import ShareIcon from '@mui/icons-material/Share';
import {
	Modal,
	Box,
	Card,
	Typography,
	Button,
	CardMedia,
	CardActions,
	Stack,
} from '@mui/material';
import '../views/Home.css';
import { shareList, findUserDetails } from '../api/firebase.js';
import { styled } from '@mui/material/styles';

const ThemedBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: theme.palette.mode === 'light' ? 'background.paper' : '#4D4B49',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}));

const ThemedInput = styled('input')(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'light' ? '#E3DCCC' : 'background.paper',
	color: theme.palette.mode === 'light' ? 'black' : 'white',
	border: 'none',
	padding: '10px',
	borderRadius: '4px',
}));

const ThemedButton = styled('button')(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'light' ? '#BFB8AC' : 'darkgrey', // replace these colors as needed
	color: theme.palette.mode === 'light' ? 'black' : 'white',
	padding: '10px 20px',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
}));

export function SingleList({ name, path, setListPath, userId }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const currentUserIsOwner = user && path.includes(user.uid);
	// modal state
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	// email invite state
	const [emailInvite, setEmailInvite] = useState('');
	const [emailExists, setEmailExists] = useState();

	const iconIndex = generateIconIndexFromPath(path);
	const icon = icons[iconIndex];

	const [ownerName, setOwnerName] = useState('');
	const userIdFromPath = path.split('/')[0];

	useEffect(() => {
		findUserDetails(userIdFromPath, userId).then((res) => setOwnerName(res));
	}, [userIdFromPath, userId]);

	// Converts path to a consistent icon index by hashing. This ensures the same path always selects the same icon.
	function generateIconIndexFromPath(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
		}
		return Math.abs(hash) % icons.length;
	}

	function handleViewClick() {
		setListPath(path);
		navigate('/list');
	}

	const handleEmailInviteChange = (e) => {
		setEmailInvite(e.target.value);
		setEmailExists('');
	};

	const handleEmailInviteSubmit = async (e) => {
		e.preventDefault();
		const isValidGmail = emailInvite.endsWith('@gmail.com');
		if (!isValidGmail) {
			setEmailExists('Please enter a valid Gmail address.');
			return;
		}
		try {
			await shareList(path, userId, emailInvite);
			setEmailExists('Your list was shared!');
			setEmailInvite('');
		} catch (err) {
			console.log(err);
			setEmailExists(err.message);
		}
	};

	return (
		<Card
			className="card"
			sx={{
				border: (theme) => {
					return theme.palette.mode === 'dark'
						? '1.5px solid #f8f9fa'
						: '1.5px solid #003780';
				},
				backgroundColor: (theme) => {
					return theme.palette.mode === 'dark' ? '#003780' : undefined;
				},
				borderRadius: '10px',
				paddingX: '1.5rem',
				display: 'flex',
				flexDirection: 'column',
				flex: '1',
			}}
		>
			<Stack direction="column">
				<CardMedia sx={{ marginX: 'auto' }}>
					<Box className="icon-background">
						<img
							src={`/img/food-icon2/${icon}`}
							className="food-icons"
							alt={`${name} list icon`}
						/>
					</Box>
				</CardMedia>
				<CardActions sx={{ justifyContent: 'center' }}>
					<Stack direction="column" sx={{ width: '100%' }}>
						<Button
							sx={{
								border: (theme) => {
									return theme.palette.mode === 'dark'
										? '1.5px solid #f8f9fa'
										: '1.5px solid #003780';
								},
								borderRadius: '10px',
								color: (theme) => {
									return theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780';
								},
							}}
							onClick={handleViewClick}
						>
							<Typography variant="body1">{name}</Typography>
						</Button>
						{currentUserIsOwner && (
							<>
								<Button
									onClick={handleOpenModal}
									sx={{
										width: '100%',
										textAlign: 'center',
										color: (theme) => {
											return theme.palette.mode === 'dark'
												? '#f8f9fa'
												: '#003780';
										},
									}}
								>
									<Typography
										sx={{
											textAlign: 'center',
											fontSize: '1.5rem',
											fontWeight: '600',
											textTransform: 'none',
										}}
									>
										Share this list{' '}
									</Typography>{' '}
									<ShareIcon
										sx={{
											margin: '0 5px',
											fontSize: '1.5rem',
										}}
									/>
								</Button>
								<Modal
									open={openModal}
									onClose={handleCloseModal}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box
										sx={(theme) => ({
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											width: 400,
											bgcolor:
												theme.palette.mode === 'light'
													? 'background.paper'
													: '#4D4B49',
											border: '2px solid #000',
											boxShadow: 24,
											p: 4,
										})}
									>
										<form onSubmit={handleEmailInviteSubmit}>
											<label htmlFor="emailInvite">
												Email invite (Gmail addresses only):
											</label>
											<ThemedInput
												id="emailInvite"
												placeholder="Type Gmail address to invite"
												name="emailInvite"
												type="email"
												onChange={handleEmailInviteChange}
												value={emailInvite}
											/>
											<ThemedButton type="submit">Invite</ThemedButton>
											<div>{emailExists}</div>
										</form>
									</Box>
								</Modal>
							</>
						)}
						{!currentUserIsOwner && (
							<Typography
								sx={{
									textAlign: 'center',
									fontSize: '1.5rem',
									color: (theme) => {
										return theme.palette.mode === 'dark'
											? '#f8f9fa'
											: '#003780';
									},
									fontWeight: '600',
								}}
							>
								Shared by {ownerName}
							</Typography>
						)}
					</Stack>
				</CardActions>
			</Stack>
		</Card>
	);
}

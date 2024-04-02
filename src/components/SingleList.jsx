import { useState } from 'react';
import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import icons from '../utils/icons.js';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import {
	Modal,
	Box,
	Card,
	CardMedia,
	CardActions,
	IconButton,
	ButtonGroup,
	Button,
	Stack,
	Typography,
} from '@mui/material';
import { shareList } from '../api/firebase.js';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

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

	function handleManageClick() {
		if (currentUserIsOwner) {
			setListPath(path);
			navigate('/manage-list');
		}
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
			sx={{
				border: '1.5px solid #003780',
				borderRadius: '10px',
				paddingX: '1.5rem',
				display: 'flex',
				flexDirection: 'column',
				flex: '1',
			}}
		>
			<Stack direction="column">
				<CardMedia>
					<img
						src={`/img/food-icons/${icon}`}
						className="food-icons"
						alt={`${name} list icon`}
					/>
				</CardMedia>
				<CardActions sx={{ justifyContent: 'center' }}>
					<Stack direction="column" sx={{ width: '100%' }}>
						<Button
							sx={{ border: '1.5px solid #003780', borderRadius: '10px' }}
							onClick={handleViewClick}
						>
							<Typography variant="body1">{name}</Typography>
						</Button>
						{currentUserIsOwner && (
							<>
								<ButtonGroup
									sx={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<IconButton>
										<EditIcon
											// onClick={handleManageClick}
											aria-label="edit list"
										/>
									</IconButton>
									<IconButton onClick={handleOpenModal}>
										<ShareIcon aria-label="share" />
									</IconButton>
									<IconButton>
										<DeleteIcon
											// onClick={handleManageClick}
											aria-label="delete list"
										/>
									</IconButton>
								</ButtonGroup>
								<Modal
									open={openModal}
									onClose={handleCloseModal}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
										<form onSubmit={handleEmailInviteSubmit}>
											<label htmlFor="emailInvite">
												Email invite (Gmail addresses only):
											</label>
											<input
												id="emailInvite"
												placeholder="Type Gmail address to invite"
												name="emailInvite"
												type="email"
												onChange={handleEmailInviteChange}
												value={emailInvite}
											/>
											<button type="submit">Invite</button>
											<div>{emailExists}</div>
										</form>
									</Box>
								</Modal>
							</>
						)}
					</Stack>
				</CardActions>
			</Stack>
		</Card>
	);
}

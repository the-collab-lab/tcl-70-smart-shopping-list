import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem, deleteItem, calculateUrgency } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';

export function ListItem({
	name,
	listPath,
	itemId,
	dateLastPurchased,
	daysUntilNextPurchase,
	setSubmitted,
	setOpenSnackbar,
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [expired, setExpired] = useState();

	const handleChange = async () => {
		if (!isChecked) {
			const userConfirmed = window.confirm('Confirm purchase?');
			if (userConfirmed) {
				setIsChecked(!isChecked);
			}
		}
	};

	const handleClick = async () => {
		if (window.confirm('Do you really want to delete this item?')) {
			try {
				await deleteItem(listPath, itemId);
				setSubmitted('Item successfully deleted!');
				setOpenSnackbar(true);
			} catch (error) {
				console.log('error: ', error);
				setSubmitted('Oops! Something went wrong! Please try again!');
				setOpenSnackbar(true);
			}
		} else {
			console.log('canceled');
			setSubmitted('Deletion canceled!');
			setOpenSnackbar(true);
		}
	};

	useEffect(() => {
		if (dateLastPurchased) {
			const expiryDate = new Date(
				dateLastPurchased.seconds * 1000 + ONE_DAY_IN_MILLISECONDS,
			);

			if (new Date() > expiryDate) {
				setIsChecked(false);
				setExpired(false);
			} else {
				setIsChecked(true);
				setExpired(true);
			}
		}
	}, [dateLastPurchased]);

	useEffect(() => {
		const handleUpdateItem = async () => {
			if (isChecked) {
				await updateItem(listPath, itemId, dateLastPurchased);
			}
		};
		try {
			handleUpdateItem();
		} catch (error) {
			console.log('error: ', error);
		}
	}, [isChecked, itemId, listPath]);

	let urgency = calculateUrgency(daysUntilNextPurchase, dateLastPurchased);
	const label = { inputProps: { 'aria-label': `${name}` } };
	let chipBackgroundColor;

	switch (urgency) {
		case 'soon':
			chipBackgroundColor = '#feff70';
			break;
		case 'kind of soon':
			chipBackgroundColor = '#80ff00';
			break;
		case 'not soon':
			chipBackgroundColor = '#ff94ff';
			break;
		default:
			chipBackgroundColor = '#808080';
	}

	return (
		<>
			<Card
				sx={{
					borderRadius: 2,
					border: (theme) => {
						return theme.palette.mode === 'dark'
							? '1.5px solid #f8f9fa'
							: '1.5px solid #003780';
					},
					backgroundColor: (theme) => {
						return theme.palette.mode === 'dark' ? '#003780' : undefined;
					},
				}}
			>
				<li
					className="ListItem"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Checkbox
							{...label}
							onChange={handleChange}
							disabled={expired}
							id={`${name}`}
							checked={isChecked}
						/>
						<span style={{ marginRight: 'auto' }}>{name}</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Chip
							label={urgency}
							sx={{
								marginRight: 2,
								backgroundColor: chipBackgroundColor,
								color: (theme) => {
									return theme.palette.mode === 'dark' ? '#003780' : undefined;
								},
								width: 75,
							}}
						/>
						<Button
							sx={{
								color: (theme) => {
									return theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780';
								},

								border: (theme) => {
									return theme.palette.mode === 'dark'
										? '1px solid #f8f9fa'
										: '1px solid #003780';
								},
								width: '80px',
							}}
							onClick={handleClick}
							variant="outlined"
							startIcon={<DeleteIcon />}
						>
							Delete
						</Button>
					</div>
				</li>
			</Card>
		</>
	);
}

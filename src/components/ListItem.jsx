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
}) {
	const [isChecked, setIsChecked] = useState(false);
	const [expired, setExpired] = useState();
	const [message, setMessage] = useState();

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
			} catch (error) {
				console.log('error: ', error);
				setMessage('Oops! Something went wrong! Please try again!');
			}
		} else {
			console.log('canceled');
			setMessage('Deletion canceled!');
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

	const urgency = calculateUrgency(daysUntilNextPurchase, dateLastPurchased);
	const label = { inputProps: { 'aria-label': `${name}` } };
	const color =
		urgency === 'soon'
			? '#FFFF00'
			: urgency === 'kindOfSoon'
				? '#00FF00'
				: urgency === 'notSoon'
					? '#FF00FF'
					: '#808080';

	return (
		<>
			<span>{message}</span>
			<Card>
				<li className="ListItem">
					<Checkbox
						{...label}
						onChange={handleChange}
						disabled={expired}
						id={`${name}`}
						checked={isChecked}
					/>
					{name}
					<Chip
						label={urgency}
						sx={{
							backgroundColor:
								urgency === 'soon'
									? '#feff70'
									: urgency === 'kind of soon'
										? '#80ff00'
										: urgency === 'not soon'
											? '#ff94ff'
											: '#808080',
						}}
					/>
					<Button
						onClick={handleClick}
						variant="outlined"
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
				</li>
			</Card>
		</>
	);
}
// <TripOriginIcon sx={{ color: '#FFFF00' }} />
{
	/* <Typography>Soon: Within 7 days</Typography>
<TripOriginIcon sx={{ color: '#00FF00' }} /> 
<Typography>Kind of Soon: From 7 to 29 days</Typography>
<TripOriginIcon sx={{ color: '#FF00FF' }} /> 
<Typography>Not Sure: From 30 to 59 days</Typography> */
}

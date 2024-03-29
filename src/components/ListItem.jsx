import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem, deleteItem, calculateUrgency } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

	return (
		<>
			<span>{message}</span>
			<li className="ListItem">
				<label htmlFor={`${name}`}>
					<input
						disabled={expired}
						id={`${name}`}
						type="checkbox"
						checked={isChecked}
						onChange={handleChange}
					/>
					{`${name}-${urgency}`}
				</label>
				<Button
					onClick={handleClick}
					variant="outlined"
					startIcon={<DeleteIcon />}
				>
					Delete
				</Button>
			</li>
		</>
	);
}

import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';

export function ListItem({ name, listPath, itemId, dateLastPurchased }) {
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
				await updateItem(listPath, itemId);
			}
		};
		try {
			handleUpdateItem();
		} catch (error) {
			console.log('error: ', error);
		}
	}, [isChecked, itemId, listPath]);

	return (
		<li className="ListItem">
			<label htmlFor={`${name}`}>
				<input
					disabled={expired}
					id={`${name}`}
					type="checkbox"
					checked={isChecked}
					onChange={handleChange}
				/>
				{name}
			</label>
		</li>
	);
}

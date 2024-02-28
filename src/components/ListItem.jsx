import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ name, listPath, itemId, dateLastPurchased }) {
	const [isChecked, setIsChecked] = useState(false);
	const [expired, setExpired] = useState();

	const handleChange = async () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (dateLastPurchased) {
			const expiryDate = new Date(dateLastPurchased.seconds * 1000 + 86400000);

			if (new Date() > expiryDate) {
				setIsChecked(false);
				setExpired(false);
			} else {
				setIsChecked(true);
				setExpired(true);
			}
		}
	}, [dateLastPurchased.seconds]);

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
	}, [isChecked]);

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

import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';

export function ListItem({
	name,
	listPath,
	itemId,
	dateLastPurchased,
	daysUntilNextPurchase,
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

	const calculateUrgency = (daysUntilNextPurchase, dateLastPurchased) => {
		const today = new Date();
		let daysSinceLastPurchase = 0;

		if (dateLastPurchased) {
			const lastPurchaseDate = new Date(dateLastPurchased.seconds * 1000);
			const timeDiff = today - lastPurchaseDate;
			daysSinceLastPurchase = Math.floor(timeDiff / ONE_DAY_IN_MILLISECONDS);
		}

		if (daysSinceLastPurchase >= 60) {
			return 'inactive';
		} else if (daysUntilNextPurchase <= 7) {
			return 'soon';
		} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
			return 'kind of soon';
		} else if (daysUntilNextPurchase >= 30 && daysUntilNextPurchase < 60) {
			return 'not soon';
		}
	};

	const urgency = calculateUrgency(daysUntilNextPurchase, dateLastPurchased);

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
				{`${name}-${urgency}`}
			</label>
		</li>
	);
}

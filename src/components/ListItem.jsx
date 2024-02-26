import './ListItem.css';
import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ name, listPath, itemId }) {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = async () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		try {
			if (isChecked) {
				updateItem(listPath, itemId);
			}
		} catch (error) {
			console.log('error: ', error);
		}
	}, [isChecked]);

	return (
		<li className="ListItem">
			<label>
				<input type="checkbox" checked={isChecked} onChange={handleChange} />
				{name}
			</label>
		</li>
	);
}

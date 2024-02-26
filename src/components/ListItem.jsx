import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ name, listPath, itemId }) {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = () => {
		setIsChecked(!isChecked);
		updateItem(listPath, itemId);
	};

	return (
		<li className="ListItem">
			<label>
				<input type="checkbox" checked={isChecked} onChange={handleChange} />
				{name}
			</label>
		</li>
	);
}

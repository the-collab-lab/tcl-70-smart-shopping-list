import './ListItem.css';
import { useState } from 'react';

export function ListItem({ name }) {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = () => {
		setIsChecked(!isChecked);
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

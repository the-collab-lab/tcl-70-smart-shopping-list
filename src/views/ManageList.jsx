import { useState } from 'react';
import { addItem } from '../api';

export function ManageList({ listPath }) {
	const [item, setItem] = useState({ name: '', urgency: '' });
	const [submitted, setSubmitted] = useState();

	const handleChange = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, urgency } = item;

		let nextPurchasedDate;
		switch (urgency) {
			case 'soon':
				nextPurchasedDate = 7;
				break;
			case 'kindOfSoon':
				nextPurchasedDate = 14;
				break;
			case 'notSoon':
				nextPurchasedDate = 30;
				break;
			default:
				console.log('Unrecognized selecton');
				return;
		}
		try {
			await addItem(listPath, {
				itemName: name,
				daysUntilNextPurchase: nextPurchasedDate,
			});
			setSubmitted('added');
		} catch (err) {
			console.log(err);
			setSubmitted('failed');
		}
	};

	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			{submitted === 'added' && <span>Your item was added!</span>}
			{submitted === 'failed' && <span>Your item was added!</span>}

			<form onSubmit={handleSubmit}>
				<label>
					Item name
					<input
						type="text"
						placeholder="Item Name"
						name="name"
						onChange={handleChange}
					/>
				</label>
				<label>
					Purchase urgency
					<select name="urgency" onChange={handleChange}>
						<option value="soon">Soon</option>
						<option value="kindOfSoon">Kind of Soon</option>
						<option value="notSoon">Not soon</option>
					</select>
				</label>
				<button type="submit" value="Submit">
					Submit
				</button>
			</form>
		</div>
	);
}

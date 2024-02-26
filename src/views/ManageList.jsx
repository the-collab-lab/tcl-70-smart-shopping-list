import { useState } from 'react';
import { addItem, shareList } from '../api';

export function ManageList({ listPath, userId }) {
	const [item, setItem] = useState({ name: '', urgency: 'soon' });
	const [submitted, setSubmitted] = useState();
	const [emailInvite, setEmailInvite] = useState('');
	const [emailExists, setEmailExists] = useState();

	const handleEmailInviteChange = (e) => {
		setEmailInvite(e.target.value);
	};

	const handleEmailInviteSubmit = async (e) => {
		e.preventDefault();
		try {
			await shareList(listPath, userId, emailInvite);
			setEmailExists('Your list was shared!');
			setEmailInvite('');
		} catch (err) {
			console.log(err);
			setEmailExists(err.message);
		}
	};

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
				console.log('Unrecognized selection');
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
			{submitted === 'failed' && <span>Your item wasn't added!</span>}
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Item name</label>
				<input
					id="itemName"
					type="text"
					placeholder="Item Name"
					name="name"
					onChange={handleChange}
				/>
				<label htmlFor="purchaseUrgency">Purchase urgency</label>
				<select id="purchaseUrgency" name="urgency" onChange={handleChange}>
					<option value="soon">Soon</option>
					<option value="kindOfSoon">Kind of Soon</option>
					<option value="notSoon">Not soon</option>
				</select>
				<button type="submit" value="Submit">
					Submit
				</button>
			</form>
			{emailExists}
			<form onSubmit={handleEmailInviteSubmit}>
				<label htmlFor="emailInvite">Email invite</label>
				<input
					id="emailInvite"
					placeholder="Type user email to invite"
					name="emailInvite"
					type="email"
					onChange={handleEmailInviteChange}
					value={emailInvite}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}

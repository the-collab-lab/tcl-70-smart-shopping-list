import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { comparePurchaseUrgency, addItem } from '../api';

export function List({ data, listPath }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	const [item, setItem] = useState({ name: '', urgency: 'soon' }); //NEEDED
	const [submitted, setSubmitted] = useState(); //NEEDED

	const handleChange = (e) => {
		const searchTermLocal = e.target.value;
		//Sets searchTerm to the input value
		setSearchTerm(searchTermLocal);
	};

	const handleAddItemChange = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value });
		setSubmitted('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, urgency } = item;

		//Changes input value to lowercase and removes spaces
		const submittedItem = name.toLowerCase().replace(/[^a-z]/g, '');

		//Empty inputs return an error
		if (!submittedItem) {
			setSubmitted('empty');
			return;
		}

		//Inputs matching exisitng list items return an error
		const match = data.find(
			(item) =>
				item.name.toLowerCase().replace(/[^a-z]/g, '') === submittedItem,
		);

		if (match) {
			setSubmitted('duplicate');
			return;
		}

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

	//Alerts based on "submitted" value
	const alertText = (submittedValue) => {
		switch (submittedValue) {
			case 'added':
				return <span>Your item was added!</span>;
			case 'failed':
				return <span>Your item wasn't added!</span>;
			case 'empty':
				return <span>Please enter an item to add to your list</span>;
			case 'duplicate':
				return <span>Item already exists!</span>;
			default:
				return '';
		}
	};

	const listName = listPath.split('/')[1];

	// const handleClick = () => navigate('/manage-list');

	//useEffect triggered with change in searchTerm or data
	useEffect(() => {
		//Debounce function
		const getItem = setTimeout(() => {
			//Filters through all items to return an array of items that match input
			const filteredResults = data
				.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(searchTerm.toLowerCase().replace(/\s+/g, '')),
				)
				.sort(comparePurchaseUrgency);
			//Sets filteredData to filteredResults data
			setFilteredData(filteredResults);
		}, 300);
		//Clears the timer set with the setTimeout()
		return () => clearTimeout(getItem);
	}, [searchTerm, data]);

	const addItemForm = () => {
		return (
			<>
				{alertText(submitted)}
				<form onSubmit={handleSubmit}>
					<label htmlFor="itemName">Item name: </label>
					<input
						id="itemName"
						type="text"
						placeholder="Item Name"
						name="name"
						onChange={handleAddItemChange}
						value={item.name}
					/>
					<label htmlFor="purchaseUrgency">Purchase urgency: </label>
					<select
						id="purchaseUrgency"
						name="urgency"
						onChange={handleAddItemChange}
						defaultValue="soon"
					>
						<option value="soon">Soon</option>
						<option value="kindOfSoon">Kind of Soon</option>
						<option value="notSoon">Not soon</option>
					</select>
					<button type="submit" value="Submit">
						Submit
					</button>
				</form>
				<p>What does "purchase urgency" mean?</p>
				<p>Select:</p>
				<ul>
					<li>"Soon" if you need the item in 7 days or less</li>
					<li>"Kind of Soon" if you need the item between 7 and 30 days</li>
					<li>"Not Soon" if you need the item from 30 to 59 days</li>
				</ul>
			</>
		);
	};

	const renderAddFirstItemCTA = () => {
		return (
			<div>
				<p>Your shopping list is empty!</p>
				<p>Use the form below to add your first item!</p>
				{addItemForm()}
			</div>
		);
	};

	const renderItemList = () => {
		return (
			<div>
				<form>
					<label htmlFor="itemSearch">Search for an item: </label>
					<input
						type="text"
						id="itemSearch"
						placeholder="Search items..."
						value={searchTerm}
						onChange={handleChange}
					></input>
					{searchTerm && (
						<button type="button" onClick={clearSearch}>
							Clear
						</button>
					)}
				</form>
				<ul>
					{/* Renders the `data` array using the `ListItem` component that's imported at the top of this file.*/}
					{filteredData.map((item) => {
						return (
							<ListItem
								key={item.id}
								daysUntilNextPurchase={item.daysUntilNextPurchase}
								dateLastPurchased={item.dateLastPurchased}
								itemId={item.id}
								name={item.name}
								listPath={listPath}
							/>
						);
					})}
				</ul>
				<p>
					<i>
						*Items that have been on the list for 60 days or more are marked
						"inactive"
					</i>
				</p>
				<p>Add more items:</p>
				{addItemForm()}
			</div>
		);
	};

	//Clears input field
	const clearSearch = () => {
		setSearchTerm('');
	};

	return (
		<>
			<h2>Items from your {listName} list!</h2>

			{data.length === 0 ? renderAddFirstItemCTA() : renderItemList()}
		</>
	);
}

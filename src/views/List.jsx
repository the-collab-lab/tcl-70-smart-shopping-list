import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const searchTermLocal = e.target.value;
		//Sets searchTerm to the input value
		setSearchTerm(searchTermLocal);
	};

	const handleClick = () => navigate('/manage-list');

	//useEffect triggered with change in searchTerm or data
	useEffect(() => {
		//Debounce function
		const getItem = setTimeout(() => {
			//Filters through all items to return an array of items that match input
			const filteredResults = data.filter((item) =>
				item.name
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(searchTerm.toLowerCase().replace(/\s+/g, '')),
			);
			//Sets filteredData to filteredResults data
			setFilteredData(filteredResults);
		}, 300);
		//Clears the timer set with the setTimeout()
		return () => clearTimeout(getItem);
	}, [searchTerm, data]);

	//Clears input field
	const clearSearch = () => {
		setSearchTerm('');
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{data.length === 0 && (
				<div>
					<p>Your shopping list is empty!</p>
					<p>Click the button below to add your first item!</p>
					<button onClick={handleClick}>Add first item</button>
				</div>
			)}
			{data.length > 0 && (
				<div>
					<form>
						<label htmlFor="itemSearch">Search for item:</label>
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
							return <ListItem key={item.id} name={item.name} />;
						})}
					</ul>
				</div>
			)}
		</>
	);
}

import { useState, useEffect } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState(data);

	// function searchItem(listItem) {
	// 	const lowerCaseListItem = listItem.toLowerCase().replace(/\s+/g, '');
	// 	const filteredList = data.filter((item) =>
	// 		item.name.toLowerCase().replace(/\s+/g, '').includes(lowerCaseListItem),
	// 	);
	// 	return filteredList;
	// }

	const handleChange = (e) => {
		const searchTermLocal = e.target.value;
		setSearchTerm(searchTermLocal);
	};

	useEffect(() => {
		const getItem = setTimeout(() => {
			function searchItem(listItem) {
				const lowerCaseListItem = listItem.toLowerCase().replace(/\s+/g, '');
				const filteredList = data.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(lowerCaseListItem),
				);
				return filteredList;
			}
			const filteredResults = searchItem(searchTerm);
			setFilteredData(filteredResults);
			console.log('debounce');
		}, 300);
		return () => clearTimeout(getItem);
	}, [searchTerm, data]);

	const clearSearch = () => {
		setSearchTerm('');
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form>
				<label htmlFor="itemSearch">Search:</label>
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
		</>
	);
}

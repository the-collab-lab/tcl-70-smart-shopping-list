import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		console.log('Changed!');
	};

	const clearSearch = () => {
		setSearchTerm('');
		console.log('CLEARED!');
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
				{data.map((item) => {
					return <ListItem key={item.id} name={item.name} />;
				})}
			</ul>
		</>
	);
}

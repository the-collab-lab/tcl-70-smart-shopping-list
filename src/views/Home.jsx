import './Home.css';
import { SingleList } from '../components/SingleList';
import { useState } from 'react';

export function Home({ data, setListPath }) {
	const [shoppingListName, setShoppingListName] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log('shopping list name: ', shoppingListName);
	};

	const handleOnChange = (event) => {
		setShoppingListName(event.target.value);
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{/* Renders the `lists` array so we can see which lists the user has access to.  */}
				{data.map((list) => {
					return (
						<SingleList
							key={list.name}
							name={list.path}
							path={list.name + '/' + list.path}
							setListPath={setListPath}
						/>
					);
				})}
			</ul>
			<form>
				<label htmlFor="shopping-list-name">Enter shopping list name:</label>
				<input
					type="text"
					name="shopping-list-name"
					id="shopping-list-name"
					onChange={handleOnChange}
					value={shoppingListName}
				/>
				<p>{shoppingListName}</p>
				<button onClick={handleSubmit} type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

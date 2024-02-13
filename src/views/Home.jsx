import './Home.css';
import { SingleList } from '../components/SingleList';
import { useEffect, useState } from 'react';
import { createList } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, user }) {
	const [shoppingListName, setShoppingListName] = useState('');
	const navigate = useNavigate();
	console.log('data: ', data);

	const handleSubmit = (event) => {
		event.preventDefault();
		const { uid, email } = user;

		const names = data.map((list) => {
			return list.name;
		});

		if (names.includes(shoppingListName)) {
			alert('name should be unique');

			return;
		}

		createList(uid, email, shoppingListName);
		alert('created');
		navigate('/list');
	};

	useEffect(() => {
		const newestList = data[data.length - 1];
		if (newestList) setListPath(newestList.path);
	}, [data]);

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
							name={list.name}
							path={list.path}
							// name={list.path}
							// path={list.name + '/' + list.path}
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
				<button
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							console.log('submitted');
						}
					}}
					onClick={handleSubmit}
					type="submit"
				>
					Create list
				</button>
			</form>
		</div>
	);
}

import './Home.css';
import { SingleList } from '../components/SingleList';
import { useEffect, useState, useRef } from 'react';
import { createList } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, userEmail, userId }) {
	const [shoppingListName, setShoppingListName] = useState('');
	const [notificationMessage, setNotificationMessage] = useState('');
	const navigate = useNavigate();
	const previousDataRef = useRef([]);

	useEffect(() => {
		const newestList = data[data.length - 1];
		setListPath(newestList?.path);

		if (previousDataRef.current.length === 0) {
			previousDataRef.current = data;
			return;
		}

		if (previousDataRef.current.length !== data.length) {
			navigate('/list');
		}

		return () => {
			previousDataRef.current = data;
		};
	}, [data.length]);

	const handleOnChange = (event) => {
		setShoppingListName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const names = data.map((list) => {
				return list.name;
			});

			if (names.includes(shoppingListName)) {
				throw new Error('Name should be unique');
			}

			await createList(userId, userEmail, shoppingListName);
			setShoppingListName('');
			setNotificationMessage(`${shoppingListName} is added to the list!`);
		} catch (error) {
			setNotificationMessage(error.message);
			console.log('submit error: ', error);
		}
	};

	return (
		<div className="Home">
			{userId ? (
				<div>
					<p>
						<strong>Instruction:</strong> If you click on List name, you will be
						redirected to items in the list. If you click on Manage, you will be
						redirected to list details and able to Edit/Delete the list.
					</p>
					<ul className="lists-container">
						<li className="SingleList create-list-card">
							<div className="SingleList-card">
								<form onSubmit={handleSubmit}>
									<label htmlFor="shopping-list-name">Add list:</label>
									<input
										type="text"
										name="shopping-list-name"
										id="shopping-list-name"
										onChange={handleOnChange}
										value={shoppingListName}
										placeholder="New list name"
									/>
									<button type="submit">Submit</button>
									{notificationMessage && <p>{notificationMessage}</p>}
								</form>
							</div>
						</li>
						{data.map((list) => (
							<SingleList
								key={list.name}
								name={list.name}
								path={list.path}
								setListPath={setListPath}
							/>
						))}
					</ul>
				</div>
			) : (
				<p>Please log in</p>
			)}
		</div>
	);
}

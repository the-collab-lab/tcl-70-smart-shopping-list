import './Home.css';
import { SingleList } from '../components/SingleList';
import { useEffect, useState, useRef } from 'react';
import { createList } from '../api/firebase';

export function Home({ data, setListPath, userEmail, userId }) {
	const [shoppingListName, setShoppingListName] = useState('');
	const [notificationMessage, setNotificationMessage] = useState('');
	const previousDataRef = useRef([]);

	useEffect(() => {
		const newestList = data[data.length - 1];
		setListPath(newestList?.path);
		return () => {
			previousDataRef.current = data;
		};
	}, [data, setListPath]);

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
					<br></br>
					<details>
						<summary>Quick Guide:</summary>
						<ul>
							<li>Click on the list name to redirect to items in the list.</li>
							<li>
								(If you are the list owner) Click on the edit icon to modify the
								list name.
							</li>
							<li>
								(If you are the list owner) Click on the share icon to share the
								list with others.
							</li>
						</ul>
					</details>
					<br></br>
					<ul className="lists-container">
						<li className="SingleList">
							<div className="SingleList-card">
								<form onSubmit={handleSubmit}>
									<label
										htmlFor="shopping-list-name"
										className="centered-block"
									>
										Add list:
									</label>
									<input
										type="text"
										name="shopping-list-name"
										id="shopping-list-name"
										onChange={handleOnChange}
										value={shoppingListName}
										placeholder="New list name"
										className="input-button-common"
									/>
									<button
										type="submit"
										className="icon-button input-button-common"
									>
										<img
											src="img/add.svg"
											className="add-icon"
											alt="add icon"
										/>
									</button>
									{notificationMessage && (
										<p className="notification-message">
											{notificationMessage}
										</p>
									)}
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

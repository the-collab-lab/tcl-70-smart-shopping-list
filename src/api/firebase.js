import {
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	addDoc,
	increment,
	deleteDoc,
	query,
	where,
	limit,
	getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import {
	getFutureDate,
	getDaysBetweenDates,
	ONE_DAY_IN_MILLISECONDS,
} from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		throw new Error('You are not the owner of this list');
	}
	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.

	if (!recipientDoc.exists()) {
		throw new Error('User not found');
	}
	// Add the list to the recipient user's sharedLists array.
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);
	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		daysUntilNextPurchase: daysUntilNextPurchase,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem(listPath, itemId, dateLastPurchased) {
	const listCollectionRef = doc(db, `${listPath}/items`, itemId);
	const itemSnapshot = await getDoc(listCollectionRef);
	if (!itemSnapshot.exists()) {
		console.log('No such document!');
		return;
	}
	const item = itemSnapshot.data();

	const previousEstimate = item.daysUntilNextPurchase;

	const itemCreated = item.dateCreated;

	let daysSinceLastPurchase;

	if (dateLastPurchased) {
		daysSinceLastPurchase = getDaysBetweenDates(
			new Date(),
			dateLastPurchased.toDate(),
		);
	} else if (getDaysBetweenDates(new Date(), itemCreated.toDate()) === 0) {
		daysSinceLastPurchase = previousEstimate;
	} else {
		daysSinceLastPurchase = getDaysBetweenDates(
			new Date(),
			itemCreated.toDate(),
		);
	}

	let nextPurchaseEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase,
		item.totalPurchases + 1,
	);

	await updateDoc(listCollectionRef, {
		dateLastPurchased: new Date(),
		totalPurchases: increment(1),
		dateNextPurchased: getFutureDate(nextPurchaseEstimate),
		daysUntilNextPurchase: nextPurchaseEstimate,
	});
}

export async function deleteItem(listPath, itemId) {
	const listCollectionRef = doc(db, `${listPath}/items`, itemId);

	await deleteDoc(listCollectionRef);
}

export function comparePurchaseUrgency(a, b) {
	const INACTIVE_THRESHOLD = 60 * ONE_DAY_IN_MILLISECONDS;
	const today = new Date();

	const timeDiffA = a.dateLastPurchased
		? today - new Date(a.dateLastPurchased.seconds * 1000)
		: null;
	const timeDiffB = b.dateLastPurchased
		? today - new Date(b.dateLastPurchased.seconds * 1000)
		: null;

	const isInactiveA = timeDiffA > INACTIVE_THRESHOLD;
	const isInactiveB = timeDiffB > INACTIVE_THRESHOLD;

	if (isInactiveA && !isInactiveB) {
		return 1;
	}
	if (!isInactiveA && isInactiveB) {
		return -1;
	}

	const daysPassedA = a.daysUntilNextPurchase;
	const daysPassedB = b.daysUntilNextPurchase;
	if (daysPassedA < daysPassedB) {
		return -1;
	} else if (daysPassedB < daysPassedA) {
		return 1;
	} else if (daysPassedA === daysPassedB) {
		return a.name.localeCompare(b.name);
	}

	throw new Error('Unexpected condition when comparing purchase urgency');
}

export const calculateUrgency = (daysUntilNextPurchase, dateLastPurchased) => {
	const today = new Date();
	let daysSinceLastPurchase = 0;

	if (dateLastPurchased) {
		const lastPurchaseDate = new Date(dateLastPurchased.seconds * 1000);
		const timeDiff = today - lastPurchaseDate;
		daysSinceLastPurchase = Math.floor(timeDiff / ONE_DAY_IN_MILLISECONDS);
	}

	if (daysSinceLastPurchase >= 60) {
		return 'inactive';
	} else if (daysUntilNextPurchase <= 7) {
		return 'soon';
	} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
		return 'kind of soon';
	} else if (daysUntilNextPurchase >= 30 && daysUntilNextPurchase < 60) {
		return 'not soon';
	} else if (!daysUntilNextPurchase) {
		return 'inactive';
	} else if (!daysSinceLastPurchase) {
		return 'inactive';
	}
};

//Find user details based on id	c

export const findUserDetails = async (listUserId, currentUser) => {
	let name;
	const q = await query(
		collection(db, 'users'),
		limit(1),
		where('uid', '==', listUserId),
		where('uid', '!=', currentUser),
	);
	await getDocs(q).then((res) => {
		res.forEach(async (doc) => {
			name = await doc.data().name;
		});
	});
	return name;
};

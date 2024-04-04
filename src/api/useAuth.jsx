import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */
export const SignInButton = () => (
	<Button
		variant="contained"
		startIcon={<GoogleIcon />}
		onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
		sx={{
			color: '#003780',
			backgroundColor: '#f8f9fa',
			border: '1px solid #003780',
			fontSize: '1.5rem',
			margin: '10px',
		}}
	>
		Sign In with Google
	</Button>
);

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => (
	<Button
		type="button"
		onClick={() => auth.signOut()}
		sx={{
			color: '#fdeecd',
			backgroundColor: '#003780',
			border: '1px solid #fdeecd',
			fontSize: '1rem',
			padding: '2px',
			margin: '0 5px',
		}}
	>
		Sign Out
	</Button>
);

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			if (user) {
				addUserToDatabase(user);
			}
		});
	}, []);

	return { user };
};

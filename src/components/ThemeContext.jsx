import { createContext, useContext, useState } from 'react';
import {
	createTheme,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const initialBackgroundImages = {
	light: '/img/main-background-image.png',
	dark: '/img/main-background-image-darkmode.png',
};

// uses React's Context API to create a global theme state
const ThemeContext = createContext({
	toggleColorMode: () => {},
	backgroundImageUrl: initialBackgroundImages.light,
});
// custom hook
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [mode, setMode] = useState('light');
	const [backgroundImageUrl, setBackgroundImageUrl] = useState(
		initialBackgroundImages.light,
	);

	const toggleColorMode = () => {
		setMode((prevMode) => {
			const newMode = prevMode === 'light' ? 'dark' : 'light';
			document.body.setAttribute('data-theme', newMode);
			return newMode;
		});
	};

	// MUI theme creation
	const theme = createTheme({
		palette: {
			mode,
		},
		typography: {
			fontSize: 16,
			allVariants: {
				letterSpacing: 'normal', // Resets to the browser's default, or use '0em' for no extra spacing
			},
		},
	});

	return (
		// Providing the Context and Theme
		<ThemeContext.Provider value={{ toggleColorMode }}>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};

import { createContext, useContext, useState } from 'react';
import {
	createTheme,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// uses React's Context API to create a global theme state
const ThemeContext = createContext({
	// prevent error of attempt to use toggleColorMode without the ThemeProvider properly set up
	toggleColorMode: () => {},
});
// custom hook
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	// state for theme mode
	const [mode, setMode] = useState('light');
	// theme mode toggle function
	const toggleColorMode = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};
	// MUI theme creation
	const theme = createTheme({
		palette: {
			mode,
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

import { createContext, useContext, useState } from 'react';
import {
	createTheme,
	ThemeProvider as MUIThemeProvider,
	CssBaseline,
} from '@mui/material/styles';

const ThemeContext = createContext({
	// prevent error of attempt to use toggleColorMode without the ThemeProvider properly set up
	toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [mode, setMode] = useState('light');

	const toggleColorMode = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	const theme = createTheme({
		palette: {
			mode,
		},
	});

	return (
		<ThemeContext.Provider value={{ toggleColorMode }}>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};

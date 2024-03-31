import { createContext, useContext, useMemo, useState } from 'react';
import {
	createTheme,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [mode, setMode] = useState('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);

	return (
		<ThemeContext.Provider value={colorMode}>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};

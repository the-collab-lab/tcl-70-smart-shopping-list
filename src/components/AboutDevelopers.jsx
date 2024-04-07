import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useTheme } from '@mui/material/styles';
import {
	Box,
	Button,
	Card,
	Grid,
	Typography,
	MobileStepper,
} from '@mui/material';
import { useState } from 'react';
import { AboutAmanda } from './AboutAmanda';
import { AboutGrace } from './AboutGrace';
import { AboutLeon } from './AboutLeon';
import { AboutMili } from './AboutMili';

export function AboutDevelopers() {
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);
	const items = [<AboutAmanda />, <AboutGrace />, <AboutLeon />, <AboutMili />];
	const numOfItems = items.length;

	const handleNext = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
	};

	const handlePrev = () => {
		setActiveIndex(
			(prevIndex) => (prevIndex - 1 + items.length) % items.length,
		);
	};
	return (
		<>
			<Box
				sx={{
					width: '100%',
					pt: 3,
					pb: 6,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					maxHeight: '100vh',
					display: { xs: 'none', sm: 'flex' },
				}}
			>
				<Typography
					variant="h2"
					sx={{
						mb: 4,
						fontWeight: 400,
						fontFamily: 'Newsreader',
						color: (theme) => {
							return theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780';
						},
					}}
				>
					The Developers
				</Typography>
				<Grid container spacing={2} alignItems="center" justifyContent="center">
					<AboutAmanda />
					<AboutGrace />
					<AboutLeon />
					<AboutMili />
				</Grid>
			</Box>

			<Box
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					display: { xs: 'flex', sm: 'none' },
					flexDirection: 'column',
					mt: 2,
				}}
			>
				<Card
					sx={{
						width: '95vw',
						maxWidth: '1000px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
						borderRadius: '16px',
						border: (theme) => {
							return theme.palette.mode === 'dark'
								? '1px solid #f8f9fa'
								: '1px solid #003780';
						},
						boxShadow: 3,
						p: 2,
						position: 'relative',
						flexDirection: 'column',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							p: 1,
							width: '95%',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<Typography
							variant="h2"
							sx={{
								mb: 4,
								fontWeight: 400,
								fontFamily: 'Newsreader',
								color: '#003780',
							}}
						>
							The Developers
						</Typography>
						{items[activeIndex]}
					</Box>
					<MobileStepper
						steps={numOfItems}
						position="static"
						activeStep={activeIndex}
						sx={{ color: '#003780', width: '80%' }}
						nextButton={
							<Button
								size="large"
								onClick={handleNext}
								sx={{ color: '#003780', fontSize: '1.5rem' }}
							>
								Next
								{theme.direction === 'rtl' ? (
									<KeyboardArrowLeft />
								) : (
									<KeyboardArrowRight />
								)}
							</Button>
						}
						backButton={
							<Button
								size="large"
								onClick={handlePrev}
								sx={{ color: '#003780', fontSize: '1.5rem' }}
							>
								{theme.direction === 'rtl' ? (
									<KeyboardArrowRight />
								) : (
									<KeyboardArrowLeft />
								)}
								Back
							</Button>
						}
					/>
				</Card>
			</Box>
		</>
	);
}

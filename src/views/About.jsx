import { Card, Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { AboutDevelopers } from '../components/AboutDevelopers';
import { AboutTcl } from '../components/AboutTcl';
import { AboutApp } from '../components/AboutApp';

export function About() {
	const [activeIndex, setActiveIndex] = useState(0);
	const items = [<AboutApp />, <AboutTcl />, <AboutDevelopers />];

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
					// display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: 4,
					display: { xs: 'none', sm: 'flex' },
				}}
			>
				<Button onClick={handlePrev} sx={{ minWidth: '64px' }}>
					<ArrowBackIosNewIcon style={{ fontSize: '4rem' }} />
				</Button>
				<Card
					sx={{
						width: '80vw',
						maxWidth: '1000px',
						minHeight: '60vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
						borderRadius: '16px',
						border: '2px solid #003780',
						boxShadow: 3,
						p: 2,
						position: 'relative',
					}}
				>
					<Box
						sx={{
							width: '100%',
							maxheight: { md: '65vh', lg: '60vh' },
							overflowY: 'auto',
							display: 'flex',
							p: 1,
						}}
					>
						{items[activeIndex]}
					</Box>
				</Card>
				<Button onClick={handleNext} sx={{ minWidth: '64px' }}>
					<ArrowForwardIosIcon style={{ fontSize: '4rem' }} />
				</Button>
			</Box>

			<Box
				sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column' }}
			>
				<AboutApp />
				<AboutTcl />
				<AboutDevelopers />
			</Box>
		</>
	);
}

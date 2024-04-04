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
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 2,
				mt: 4,
			}}
		>
			<Button onClick={handlePrev} sx={{ minWidth: '64px' }}>
				<ArrowBackIosNewIcon />
			</Button>
			<Card
				sx={{
					width: '80vw',
					maxWidth: '1000px',
					height: '60vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
					borderRadius: '16px',
					border: '2px solid #003780',
					boxShadow: 3,
					p: 2,
				}}
			>
				{items[activeIndex]}
			</Card>
			<Button onClick={handleNext} sx={{ minWidth: '64px' }}>
				<ArrowForwardIosIcon />
			</Button>
		</Box>
	);
}

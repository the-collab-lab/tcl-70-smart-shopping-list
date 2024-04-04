import { Typography, Grid, Button, Box } from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset';

export function AboutTcl() {
	return (
		<Box sx={{ width: '100%', mt: 1, mb: 1, overflow: 'auto' }}>
			<Grid container spacing={2} direction="column" alignItems="center">
				<Grid item xs={12}>
					<Typography variant="h2" sx={{ textAlign: 'center' }}>
						Our Project & The Collab Lab
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<img
						src="/img/the-collab-lab.png"
						alt="The Collab Lab"
						style={{
							maxWidth: '100%',
							height: 'auto',
							borderRadius: '8px',
							border: '2px solid #003780',
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography sx={{ textAlign: 'center' }}>
						This project was brought to life as part of The Collab Lab, an
						initiative designed to empower aspiring developers through teamwork
						and real-world experience. Within this supportive and dynamic
						environment, we honed our technical skills and learned the essence
						of collaboration, greatly aided by the guidance of experienced
						developers serving as mentors.
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button
						href="https://the-collab-lab.codes/"
						sx={{
							backgroundColor: '#003780',
							'&:hover': { backgroundColor: '#0058cd' },
							color: 'white',
						}}
					>
						<WebAssetIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
						Visit Website
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

import { Typography, Grid, Button, Box, Container } from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset';

export function AboutTcl() {
	return (
		<>
			<Box
				sx={{
					width: '100%',
					mt: 5,
					mb: 5,
					display: { xs: 'none', sm: 'flex' },
				}}
			>
				<Grid
					container
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Grid item xs={12}>
						<Typography
							variant="h2"
							sx={{
								mb: 2,
								textAlign: 'center',
								fontFamily: 'Newsreader',
								fontWeight: 400,
								color: (theme) => {
									return theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780';
								},
							}}
						>
							Our Project & The Collab Lab
						</Typography>
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<img
							src="/img/the-collab-lab.png"
							alt="The Collab Lab"
							style={{
								maxWidth: '100%',
								height: 'auto',
								borderRadius: '10px',
								border: '2px solid #003780',
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Typography sx={{ mb: 2, textAlign: 'center', fontSize: '1.5rem' }}>
							This project was brought to life as part of The Collab Lab, an
							initiative designed to empower aspiring developers through
							teamwork and real-world experience. Within this supportive and
							dynamic environment, we honed our technical skills and learned the
							essence of collaboration, greatly aided by the guidance of
							experienced developers serving as mentors.
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							href="https://the-collab-lab.codes/"
							sx={{
								backgroundColor: '#003780',
								'&:hover': { backgroundColor: '#0058cd' },
								color: 'white',
								mt: 2,
								border: (theme) => {
									return theme.palette.mode === 'dark'
										? '1px solid #f8f9fa'
										: '1px solid #003780';
								},
							}}
						>
							<WebAssetIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
							Visit Website
						</Button>
					</Grid>
				</Grid>
			</Box>

			<Box
				sx={{
					mt: 2,
					display: { xs: 'flex', sm: 'none' },
					flexDirection: 'column',
					border: '1px solid #003780',
					borderRadius: '10px',
					width: '95vw',
					padding: '10px',
				}}
			>
				<Container maxWidth="sm">
					<Typography
						variant="h2"
						sx={{
							mb: 2,
							textAlign: 'center',
							fontFamily: 'Newsreader',
							fontWeight: 400,
							color: '#003780',
							fontSize: '4rem',
						}}
					>
						Our Project & The Collab Lab
					</Typography>
				</Container>
				<Container
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<img
						src="/img/the-collab-lab.png"
						alt="The Collab Lab"
						style={{
							maxWidth: '100%',
							height: 'auto',
							borderRadius: '10px',
							border: '2px solid #003780',
						}}
					/>
				</Container>
				<Container>
					<Typography
						sx={{ mb: 2, textAlign: 'center', fontSize: '1.5rem', mt: 2 }}
					>
						This project was brought to life as part of The Collab Lab, an
						initiative designed to empower aspiring developers through teamwork
						and real-world experience. Within this supportive and dynamic
						environment, we honed our technical skills and learned the essence
						of collaboration, greatly aided by the guidance of experienced
						developers serving as mentors.
					</Typography>
				</Container>
				<Container
					item
					xs={12}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
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
				</Container>
			</Box>
		</>
	);
}

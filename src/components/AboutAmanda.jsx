import {
	Typography,
	Card,
	CardContent,
	Avatar,
	Box,
	IconButton,
	Grid,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function AboutAmanda() {
	return (
		<Grid item xs={12} sm={6} md={6} lg={3} sx={{ width: { xs: '100%' } }}>
			<Card
				sx={{
					border: '1.5px solid #003780',
					borderRadius: '20px',
					padding: '1.5rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar
					sx={{
						width: 80,
						height: 80,
						marginBottom: 2,
						bgcolor: '#003780',
					}}
				>
					AG
				</Avatar>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						textAlign="center"
						sx={{ fontWeight: 'bold', marginBottom: 2 }}
					>
						Amanda Guan
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
						<IconButton
							sx={{
								color: 'white',
								backgroundColor: '#003780',
								'&:hover': { backgroundColor: '#0058cd' },
								width: 48,
								height: 48,
							}}
						>
							<LinkedInIcon />
						</IconButton>
						<IconButton
							sx={{
								color: 'white',
								backgroundColor: '#003780',
								'&:hover': { backgroundColor: '#0058cd' },
								width: 48,
								height: 48,
							}}
						>
							<GitHubIcon />
						</IconButton>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
}

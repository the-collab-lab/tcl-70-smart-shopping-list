import {
	Typography,
	Card,
	CardContent,
	Avatar,
	Box,
	IconButton,
	Grid,
	Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function AboutAmanda() {
	return (
		<Grid item xs={12} sm={6} md={6} lg={3} sx={{ width: { xs: '100%' } }}>
			<Card
				sx={{
					border: (theme) => {
						return theme.palette.mode === 'dark'
							? '1px solid #f8f9fa'
							: '1px solid #003780';
					},
					borderRadius: '20px',
					padding: '1.5rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					backgroundColor: (theme) => {
						return theme.palette.mode === 'dark' ? '#003780' : '#f8f9fa';
					},
				}}
			>
				<Avatar
					sx={{
						width: 80,
						height: 80,
						marginBottom: 2,
						backgroundColor: (theme) => {
							return theme.palette.mode === 'dark' ? '#003780' : '#f8f9fa';
						},
						border: (theme) => {
							return theme.palette.mode === 'dark'
								? '1.5px solid #f8f9fa'
								: '1.5px solid #003780';
						},
						color: (theme) => {
							return theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780';
						},
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
						sx={{
							fontWeight: 'bold',
							marginBottom: 2,
							color: (theme) => {
								return theme.palette.mode === 'dark' ? '#f8f9fa' : '#003780';
							},
						}}
					>
						Amanda Guan
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
						<Link href="https://www.linkedin.com/in/amandaguan1/">
							<IconButton
								sx={{
									color: 'white',
									backgroundColor: '#003780',
									'&:hover': { backgroundColor: '#0058cd' },
									width: 48,
									height: 48,
									border: (theme) => {
										return theme.palette.mode === 'dark'
											? '1.5px solid #f8f9fa'
											: '1.5px solid #003780';
									},
								}}
							>
								<LinkedInIcon />
							</IconButton>
						</Link>
						<Link href="https://github.com/amandaguan-ag">
							<IconButton
								sx={{
									color: 'white',
									backgroundColor: '#003780',
									'&:hover': { backgroundColor: '#0058cd' },
									width: 48,
									height: 48,
									border: (theme) => {
										return theme.palette.mode === 'dark'
											? '1.5px solid #f8f9fa'
											: '1.5px solid #003780';
									},
								}}
							>
								<GitHubIcon />
							</IconButton>
						</Link>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
}

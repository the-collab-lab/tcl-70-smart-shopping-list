import {
	Typography,
	Card,
	CardContent,
	Avatar,
	Box,
	IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function AboutDevelopers() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // Centers the content vertically
				width: '100%',
				margin: '40px 0',
			}}
		>
			<Typography variant="h2" sx={{ marginBottom: 2 }}>
				The Developers
			</Typography>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '20px',
					flexWrap: 'wrap',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<Card
					className="card"
					sx={{
						border: '1.5px solid #003780',
						borderRadius: '20px',
						padding: '1.5rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flex: '1',
						maxWidth: '240px',
					}}
				>
					<Box
						sx={{
							'&:hover': { backgroundColor: 'transparent' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar
							sx={{
								width: 80,
								height: 80,
								marginBottom: 1,
								bgcolor: '#ff9a8d',
							}}
						>
							AG
						</Avatar>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								textAlign="center"
								sx={{ marginBottom: 2, fontWeight: 'bold' }}
							>
								Amanda Guan
							</Typography>
							<Box display="flex" justifyContent="center" gap={2}>
								<IconButton
									aria-label="LinkedIn"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<LinkedInIcon />
								</IconButton>
								<IconButton
									aria-label="GitHub"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<GitHubIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Box>
				</Card>
				<Card
					className="card"
					sx={{
						border: '1.5px solid #003780',
						borderRadius: '20px',
						padding: '1.5rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flex: '1',
						maxWidth: '240px',
					}}
				>
					<Box
						sx={{
							'&:hover': { backgroundColor: 'transparent' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar
							sx={{
								width: 80,
								height: 80,
								marginBottom: 1,
								bgcolor: '#ff9a8d',
							}}
						>
							GL
						</Avatar>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								textAlign="center"
								sx={{ marginBottom: 2, fontWeight: 'bold' }}
							>
								Grace Lee
							</Typography>
							<Box display="flex" justifyContent="center" gap={2}>
								<IconButton
									aria-label="LinkedIn"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<LinkedInIcon />
								</IconButton>
								<IconButton
									aria-label="GitHub"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<GitHubIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Box>
				</Card>
				<Card
					className="card"
					sx={{
						border: '1.5px solid #003780',
						borderRadius: '20px',
						padding: '1.5rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flex: '1',
						maxWidth: '240px',
					}}
				>
					<Box
						sx={{
							'&:hover': { backgroundColor: 'transparent' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar
							sx={{
								width: 80,
								height: 80,
								marginBottom: 1,
								bgcolor: '#ff9a8d',
							}}
						>
							LC
						</Avatar>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								textAlign="center"
								sx={{ marginBottom: 2, fontWeight: 'bold' }}
							>
								Leon Chung
							</Typography>
							<Box display="flex" justifyContent="center" gap={2}>
								<IconButton
									aria-label="LinkedIn"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<LinkedInIcon />
								</IconButton>
								<IconButton
									aria-label="GitHub"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<GitHubIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Box>
				</Card>
				<Card
					className="card"
					sx={{
						border: '1.5px solid #003780',
						borderRadius: '20px',
						padding: '1.5rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flex: '1',
						maxWidth: '240px',
					}}
				>
					<Box
						sx={{
							'&:hover': { backgroundColor: 'transparent' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar
							sx={{
								width: 80,
								height: 80,
								marginBottom: 1,
								bgcolor: '#ff9a8d',
							}}
						>
							ML
						</Avatar>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								textAlign="center"
								sx={{ marginBottom: 2, fontWeight: 'bold' }}
							>
								Mili Made
							</Typography>
							<Box display="flex" justifyContent="center" gap={2}>
								<IconButton
									aria-label="LinkedIn"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<LinkedInIcon />
								</IconButton>
								<IconButton
									aria-label="GitHub"
									sx={{
										color: 'white',
										backgroundColor: '#ff9a8d',
										'&:hover': { backgroundColor: '#ffada4' },
										width: 48,
										height: 48,
									}}
								>
									<GitHubIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Box>
				</Card>
			</div>
		</div>
	);
}

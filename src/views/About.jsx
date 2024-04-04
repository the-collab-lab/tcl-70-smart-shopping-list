import {
	Typography,
	Link,
	Card,
	CardContent,
	Avatar,
	Box,
	IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function About() {
	return (
		<>
			<div
				style={{
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '100%',
						marginBottom: '20px',
					}}
				>
					<Typography variant="h2" style={{ width: '40%' }}>
						About This App
					</Typography>
					<div style={{ width: '60%' }}>
						<Typography>
							The SwiftShop is a “smart” shopping list app that learns your
							buying habits and helps you remember what you’re likely to need to
							buy on your next trip to the store.
						</Typography>
						<Link
							href="https://github.com/the-collab-lab/tcl-70-smart-shopping-list"
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: '10px',
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							<GitHubIcon fontSize="large" />
							<Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
								Check out the project repository!
							</Typography>
						</Link>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '100%',
						marginBottom: '20px',
					}}
				>
					<div style={{ width: '60%' }}>
						<Typography>
							This project was brought to life as part of The Collab Lab, an
							initiative designed to empower aspiring developers through
							teamwork and real-world experience. Within this supportive and
							dynamic environment, we honed our technical skills and learned the
							essence of collaboration, greatly aided by the guidance of
							experienced developers serving as mentors.
						</Typography>
						<Link
							href="https://the-collab-lab.codes/"
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: '10px',
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							<WebAssetIcon />
							<Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
								More about The Collab Lab!
							</Typography>
						</Link>
					</div>
					<Typography variant="h2" style={{ width: '40%', textAlign: 'right' }}>
						Our Project & The Collab Lab
					</Typography>
				</div>
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
							<Avatar sx={{ width: 80, height: 80, marginBottom: 1 }} />
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
							<Avatar sx={{ width: 80, height: 80, marginBottom: 1 }} />
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
							<Avatar sx={{ width: 80, height: 80, marginBottom: 1 }} />
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
							<Avatar sx={{ width: 80, height: 80, marginBottom: 1 }} />
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
		</>
	);
}

import {
	Typography,
	Link,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Avatar,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// href="https://github.com/the-collab-lab/tcl-70-smart-shopping-list"
// href="https://the-collab-lab.codes/"
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
							href="#"
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: '10px',
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							<GitHubIcon />
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
							href="#"
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
							borderRadius: '10px',
							padding: '1.5rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							flex: '1',
							maxWidth: '240px',
						}}
					>
						<CardActionArea
							disableRipple
							sx={{
								'&:hover': { backgroundColor: 'transparent' },
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ width: 56, height: 56, marginBottom: 2 }} />
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									textAlign="center"
								>
									Name
								</Typography>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: '#003780',
									}}
								>
									<LinkedInIcon />
									<GitHubIcon sx={{ marginLeft: 2 }} />
								</div>
							</CardContent>
						</CardActionArea>
					</Card>
					<Card
						className="card"
						sx={{
							border: '1.5px solid #003780',
							borderRadius: '10px',
							padding: '1.5rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							flex: '1',
							maxWidth: '240px',
						}}
					>
						<CardActionArea
							disableRipple
							sx={{
								'&:hover': { backgroundColor: 'transparent' },
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ width: 56, height: 56, marginBottom: 2 }} />
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									textAlign="center"
								>
									Name
								</Typography>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: '#003780',
									}}
								>
									<LinkedInIcon />
									<GitHubIcon sx={{ marginLeft: 2 }} />
								</div>
							</CardContent>
						</CardActionArea>
					</Card>
					<Card
						className="card"
						sx={{
							border: '1.5px solid #003780',
							borderRadius: '10px',
							padding: '1.5rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							flex: '1',
							maxWidth: '240px',
						}}
					>
						<CardActionArea
							disableRipple
							sx={{
								'&:hover': { backgroundColor: 'transparent' },
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ width: 56, height: 56, marginBottom: 2 }} />
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									textAlign="center"
								>
									Name
								</Typography>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: '#003780',
									}}
								>
									<LinkedInIcon />
									<GitHubIcon sx={{ marginLeft: 2 }} />
								</div>
							</CardContent>
						</CardActionArea>
					</Card>
					<Card
						className="card"
						sx={{
							border: '1.5px solid #003780',
							borderRadius: '10px',
							padding: '1.5rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							flex: '1',
							maxWidth: '240px',
						}}
					>
						<CardActionArea
							disableRipple
							sx={{
								'&:hover': { backgroundColor: 'transparent' },
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ width: 56, height: 56, marginBottom: 2 }} />
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									textAlign="center"
								>
									Name
								</Typography>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: '#003780',
									}}
								>
									<LinkedInIcon />
									<GitHubIcon sx={{ marginLeft: 2 }} />
								</div>
							</CardContent>
						</CardActionArea>
					</Card>
				</div>
			</div>
		</>
	);
}

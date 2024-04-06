import { Typography, Button, Grid, Box, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export function AboutApp() {
	return (
		<>
			<Box
				sx={{
					width: '100%',
					mt: 4,
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
								color: '#003780',
							}}
						>
							About This App
						</Typography>
					</Grid>
					<Grid
						item
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						xs={6}
					>
						<img
							src="/img/swiftshop.png"
							alt="image of swiftshop app"
							style={{
								maxWidth: '70%',
								height: 'auto',
								borderRadius: '8px',
								border: '2px solid #003780',
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Typography
							sx={{
								mb: 2,
								textAlign: 'center',
								fontSize: '1.5rem',
								margin: '2px',
							}}
						>
							The SwiftShop is a “smart” shopping list app that learns your
							buying habits and helps you remember what you’re likely to need to
							buy on your next trip to the store. As a user, you will create a
							new shopping list and enter items (e.g., “Greek yogurt” or “Paper
							towels”) into your list. Each time you buy the item, you mark it
							as purchased in the list. Over time, the app comes to understand
							the intervals at which you buy different items. If an item is
							likely to be due to be bought soon, it rises to the top of the
							shopping list.
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							mt: 1,
						}}
					>
						<Button
							href="https://github.com/the-collab-lab/tcl-70-smart-shopping-list"
							sx={{
								backgroundColor: '#003780',
								'&:hover': { backgroundColor: '#0058cd' },
								color: 'white',
								display: 'flex',
								alignItems: 'center',
								width: 'fit-content',
							}}
						>
							<GitHubIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
							Visit Repo
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
						About This App
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
						src="/img/swiftshop.png"
						alt="image of swiftshop app"
						style={{
							maxWidth: '70%',
							height: 'auto',
							borderRadius: '8px',
							border: '2px solid #003780',
							margin: '10px',
						}}
					/>
				</Container>
				<Container>
					<Typography
						sx={{
							mb: 2,
							textAlign: 'center',
							fontSize: '1.5rem',
							margin: '2px',
						}}
					>
						The SwiftShop is a “smart” shopping list app that learns your buying
						habits and helps you remember what you’re likely to need to buy on
						your next trip to the store. As a user, you will create a new
						shopping list and enter items (e.g., “Greek yogurt” or “Paper
						towels”) into your list. Each time you buy the item, you mark it as
						purchased in the list. Over time, the app comes to understand the
						intervals at which you buy different items. If an item is likely to
						be due to be bought soon, it rises to the top of the shopping list.
					</Typography>
				</Container>
				<Container
					item
					xs={12}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mt: 1,
					}}
				>
					<Button
						href="https://github.com/the-collab-lab/tcl-70-smart-shopping-list"
						sx={{
							backgroundColor: '#003780',
							'&:hover': { backgroundColor: '#0058cd' },
							color: 'white',
							display: 'flex',
							alignItems: 'center',
							width: 'fit-content',
						}}
					>
						<GitHubIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
						Visit Repo
					</Button>
				</Container>
			</Box>
		</>
	);
}

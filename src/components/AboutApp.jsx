import { Typography, Button, Grid, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export function AboutApp() {
	return (
		<Box sx={{ mt: 1, mb: 1, overflow: 'auto' }}>
			<Grid container spacing={2} direction="column" alignItems="center">
				<Grid item>
					<Typography variant="h2" sx={{ textAlign: 'center' }}>
						About This App
					</Typography>
				</Grid>
				<Grid
					item
					sx={{
						height: { xs: '80%', sm: '38%' },
						width: { xs: '80%', sm: '38%' },
					}}
				>
					<img
						src="/img/swiftshop.png"
						alt="image of swiftshop app"
						style={{
							maxWidth: '100%',
							height: 'auto',
							borderRadius: '8px',
							border: '2px solid #003780',
						}}
					/>
				</Grid>
				<Grid item>
					<Typography sx={{ textAlign: 'center' }}>
						The SwiftShop is a “smart” shopping list app that learns your buying
						habits and helps you remember what you’re likely to need to buy on
						your next trip to the store. As a user, you will create a new
						shopping list and enter items (e.g., “Greek yogurt” or “Paper
						towels”) into your list. Each time you buy the item, you mark it as
						purchased in the list. Over time, the app comes to understand the
						intervals at which you buy different items. If an item is likely to
						be due to be bought soon, it rises to the top of the shopping list.
					</Typography>
				</Grid>
				<Grid item>
					<Button
						href="https://github.com/the-collab-lab/tcl-70-smart-shopping-list"
						sx={{
							backgroundColor: '#003780',
							'&:hover': { backgroundColor: '#0058cd' },
							color: 'white',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<GitHubIcon sx={{ mr: 1, fontSize: '2.5rem' }} />
						Visit Repo
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

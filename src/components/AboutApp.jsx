import { Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export function AboutApp() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				margin: '40px',
				gap: '20px',
			}}
		>
			<div style={{ width: '40%' }}>
				<Typography variant="h2" style={{ textAlign: 'left' }}>
					About This App
				</Typography>
				<Typography>
					The SwiftShop is a “smart” shopping list app that learns your buying
					habits and helps you remember what you’re likely to need to buy on
					your next trip to the store.
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
			<div style={{ width: '40%', marginRight: '70px' }}>
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
			</div>
		</div>
	);
}

import { Typography, Link } from '@mui/material';
import WebAssetIcon from '@mui/icons-material/WebAsset';

export function AboutTcl() {
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
					Our Project & The Collab Lab
				</Typography>
				<Typography>
					This project was brought to life as part of The Collab Lab, an
					initiative designed to empower aspiring developers through teamwork
					and real-world experience. Within this supportive and dynamic
					environment, we honed our technical skills and learned the essence of
					collaboration, greatly aided by the guidance of experienced developers
					serving as mentors.
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
			<div style={{ width: '40%' }}>
				<img
					src={`../public/img/the-collab-lab.png`}
					alt="Description"
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

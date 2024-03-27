import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import icons from '../utils/icons.js';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const currentUserIsOwner = user && path.includes(user.uid);

	const iconIndex = generateIconIndexFromPath(path);
	const icon = icons[iconIndex];

	// Converts path to a consistent icon index by hashing. This ensures the same path always selects the same icon.
	function generateIconIndexFromPath(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
		}
		return Math.abs(hash) % icons.length;
	}

	function handleViewClick() {
		setListPath(path);
		navigate('/list');
	}

	function handleManageClick() {
		if (currentUserIsOwner) {
			setListPath(path);
			navigate('/manage-list');
		}
	}

	return (
		<li>
			<div className="SingleList-card">
				<img
					src={`/img/food-icons/${icon}`}
					className="food-icons"
					alt={`${name} list icon`}
				/>
				<button onClick={handleViewClick} className="list-name-button">
					{name}
				</button>
				{currentUserIsOwner && (
					<div className="icon-container">
						<EditIcon onClick={handleManageClick} />
						<ShareIcon onClick={handleManageClick} />
						<DeleteIcon onClick={handleManageClick} />
					</div>
				)}
			</div>
		</li>
	);
}

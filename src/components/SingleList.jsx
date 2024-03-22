import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import icons from '../utils/icons.js';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const currentUserIsOwner = user && path.includes(user.uid);

	function generateIconIndexFromPath(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash &= hash;
		}
		return Math.abs(hash) % icons.length;
	}

	const iconIndex = generateIconIndexFromPath(path);
	const icon = icons[iconIndex];

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
						<button onClick={handleManageClick} className="icon-button">
							<img src="img/edit.png" className="util-icons" alt="Edit" />
						</button>
						<button onClick={handleManageClick} className="icon-button">
							<img src="img/share.png" className="util-icons" alt="Share" />
						</button>
					</div>
				)}
			</div>
		</li>
	);
}

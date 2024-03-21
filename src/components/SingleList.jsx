import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';
import icons from '../utils/icons.js';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const currentUserIsOwner = user && path.includes(user.uid);

	const randomIcon = icons[Math.floor(Math.random() * icons.length)];

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
		<li className="SingleList">
			<div className="SingleList-card">
				<img src={`/img/food-icons/${randomIcon}`} alt="List" />
				<button onClick={handleViewClick}>{name}</button>
				{currentUserIsOwner && (
					<button onClick={handleManageClick}>Manage</button>
				)}
			</div>
		</li>
	);
}

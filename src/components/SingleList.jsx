import './SingleList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/useAuth.jsx';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const currentUserIsOwner = user && path.includes(user.uid);

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
				<img src={`https://picsum.photos/seed/${name}/200/200`} alt="List" />
				<button onClick={handleViewClick}>{name}</button>
				{currentUserIsOwner && (
					<button onClick={handleManageClick}>Manage</button>
				)}
			</div>
		</li>
	);
}

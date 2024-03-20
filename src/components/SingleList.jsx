import './SingleList.css';
import { useNavigate } from 'react-router-dom';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();

	function handleViewClick() {
		setListPath(path);
		navigate('/list');
	}

	function handleManageClick() {
		setListPath(path);
		navigate('/manage-list');
	}

	return (
		<li className="SingleList">
			<div className="SingleList-card">
				<img></img>
				<button onClick={handleViewClick}>{name}</button>
				<button onClick={handleManageClick}>Manage</button>{' '}
			</div>
		</li>
	);
}

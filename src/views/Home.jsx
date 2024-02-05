import './Home.css';
import { SingleList } from '../components/SingleList';

export function Home({ data, setListPath }) {
	console.log(data);
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{/* Renders the `lists` array so we can see which lists the user has access to.  */}
				{data.map((list) => {
					return <SingleList name={list.name} path={list.path} />;
				})}
			</ul>
		</div>
	);
}

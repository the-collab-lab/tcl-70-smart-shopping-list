import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { comparePurchaseUrgency, addItem } from '../api';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function List({ data, listPath }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	const [item, setItem] = useState({ name: '', urgency: '' });
	const [submitted, setSubmitted] = useState();

	const handleChange = (e) => {
		const searchTermLocal = e.target.value;
		//Sets searchTerm to the input value
		setSearchTerm(searchTermLocal);
	};

	const handleAddItemChange = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value });
		setSubmitted('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, urgency } = item;

		//Changes input value to lowercase and removes spaces
		const submittedItem = name.toLowerCase().replace(/[^a-z]/g, '');

		//Empty inputs return an error
		if (!submittedItem) {
			setSubmitted('empty');
			return;
		}

		//Inputs matching exisitng list items return an error
		const match = data.find(
			(item) =>
				item.name.toLowerCase().replace(/[^a-z]/g, '') === submittedItem,
		);

		if (match) {
			setSubmitted('duplicate');
			return;
		}

		let nextPurchasedDate;
		switch (urgency) {
			case 'soon':
				nextPurchasedDate = 7;
				break;
			case 'kindOfSoon':
				nextPurchasedDate = 14;
				break;
			case 'notSoon':
				nextPurchasedDate = 30;
				break;
			default:
				console.log('Unrecognized selection');
				return;
		}
		try {
			await addItem(listPath, {
				itemName: name,
				daysUntilNextPurchase: nextPurchasedDate,
			});
			setSubmitted('added');
			setItem({ ...item, name: '' });
		} catch (err) {
			console.log(err);
			setSubmitted('failed');
		}
	};

	//Getting the name of the list
	const listName = listPath.split('/')[1];

	//Alerts based on "submitted" value
	const alertText = (submittedValue) => {
		switch (submittedValue) {
			case 'added':
				return <span>Your item was added!</span>;
			case 'failed':
				return <span>Your item wasn't added!</span>;
			case 'empty':
				return <span>Please enter an item to add to your list</span>;
			case 'duplicate':
				return <span>Item already exists!</span>;
			default:
				return '';
		}
	};

	//useEffect triggered with change in searchTerm or data
	useEffect(() => {
		//Debounce function
		const getItem = setTimeout(() => {
			//Filters through all items to return an array of items that match input
			const filteredResults = data
				.filter((item) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(searchTerm.toLowerCase().replace(/\s+/g, '')),
				)
				.sort(comparePurchaseUrgency);
			//Sets filteredData to filteredResults data
			setFilteredData(filteredResults);
		}, 300);
		//Clears the timer set with the setTimeout()
		return () => clearTimeout(getItem);
	}, [searchTerm, data]);

	const addItemForm = () => {
		return (
			<section className="addAnItemForm">
				<form onSubmit={handleSubmit}>
					{/* Add item form for larger screens */}
					<Box
						sx={{ width: '100%', display: { xs: 'none', md: 'block' }, mr: 1 }}
					>
						<Grid container alignItems="flex-end" spacing={2} ml={4}>
							<Grid item>
								<Typography variant="h4">Add an item</Typography>
							</Grid>
							{alertText(submitted)}
							<Grid item xs>
								<FormControl variant="standard" fullWidth>
									<InputLabel htmlFor="itemName">Enter item name:</InputLabel>
									<Input
										id="itemName"
										placeholder="Item Name"
										value={item.name}
										name="name"
										onChange={handleAddItemChange}
									/>
								</FormControl>
							</Grid>
							<Grid item>
								<FormControl variant="standard" sx={{ minWidth: 200 }}>
									<InputLabel id="purchaseUrgencyInput">
										How soon will you buy this item:
									</InputLabel>
									<Select
										labelId="purchaseUrgencyInput"
										id="purchaseUrgency"
										name="urgency"
										label="How soon will you buy this item:"
										value={item.urgency}
										onChange={handleAddItemChange}
										required
									>
										<MenuItem value="soon">Soon</MenuItem>
										<MenuItem value="kindOfSoon">Kind of Soon</MenuItem>
										<MenuItem value="notSoon">Not soon</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item mr={10}>
								<Button type="submit">Submit</Button>
							</Grid>
						</Grid>
					</Box>
					{/* Add item form for smaller screens */}
					<Box sx={{ display: { md: 'none' } }}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								Add an item +{' '}
							</AccordionSummary>
							{alertText(submitted)}
							<AccordionDetails>
								<FormControl variant="standard">
									<InputLabel htmlFor="itemName">Enter item name:</InputLabel>
									<Input
										id="itemName"
										placeholder="Item Name"
										value={item.name}
										name="name"
										onChange={handleAddItemChange}
									/>
								</FormControl>
								<FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
									<InputLabel id="purchaseUrgencyInput">
										How soon will you buy this item:
									</InputLabel>
									<Select
										labelId="purchaseUrgencyInput"
										id="purchaseUrgency"
										name="urgency"
										label="How soon will you buy this item:"
										onChange={handleAddItemChange}
										value={item.urgency}
										required
									>
										<MenuItem value="soon">Soon</MenuItem>
										<MenuItem value="kindOfSoon">Kind of Soon</MenuItem>
										<MenuItem value="notSoon">Not soon</MenuItem>
									</Select>
								</FormControl>
								<Button type="submit" value="Submit">
									Submit
								</Button>
							</AccordionDetails>
						</Accordion>
					</Box>
				</form>
			</section>
		);
	};

	// shown when list is empty
	const renderAddFirstItemCTA = () => {
		return (
			<div>
				<h2>{listName} List</h2>
				<p>Your shopping list is empty!</p>
				<p>Use the form below to add your first item!</p>
				{addItemForm()}
			</div>
		);
	};

	const renderItemList = () => {
		return (
			<div>
				<Box
					sx={{
						flexDirection: { xs: 'column', md: 'row' },
						'& > *:not(last-child)': {
							mb: { xs: 2 },
						},
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<h2>{listName} List</h2>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<FormControl variant="standard" sx={{ width: '250px' }}>
							<InputLabel htmlFor="itemSearch">Search for an item:</InputLabel>
							<Input
								id="itemSearch"
								placeholder="Search items"
								value={searchTerm}
								onChange={handleChange}
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								endAdornment={
									searchTerm && (
										<InputAdornment position="end">
											<Button onClick={clearSearch} sx={{ minWidth: 'auto' }}>
												Clear
											</Button>
										</InputAdornment>
									)
								}
							/>
						</FormControl>
					</Box>
				</Box>
				<Divider sx={{ borderBottomWidth: '3px', mb: { xs: 2 } }} />
				{addItemForm()}
				<Grid
					container
					alignItems="center"
					justifyContent="space-around"
					spacing={{ xs: 0, md: 2 }}
					mt={1}
					sx={{ mt: { xs: 1 }, mb: { xs: 0 } }}
				>
					<Grid item>
						<Grid container alignItems="center" spacing={1}>
							<Grid item>
								<TripOriginIcon sx={{ color: '#feff70' }} />
							</Grid>
							<Grid item>
								<Typography>Soon: Within 7 days</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
						<Grid container alignItems="center" spacing={1}>
							<Grid item>
								<TripOriginIcon sx={{ color: '#80ff00' }} />
							</Grid>
							<Grid item>
								<Typography>Kind of Soon: From 7 to 29 days</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
						<Grid container alignItems="center" spacing={1}>
							<Grid item>
								<TripOriginIcon sx={{ color: '#ff94ff' }} />
							</Grid>
							<Grid item>
								<Typography>Not Sure: From 30 to 59 days</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Typography
					variant="body2"
					align="right"
					sx={{ fontStyle: 'italic', mt: 2, mb: 1 }}
				>
					*Items that have been on the list for 60 days or more are marked
					"inactive"
				</Typography>
				<ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
					{/* Renders the `data` array using the `ListItem` component that's imported at the top of this file.*/}
					<Grid container spacing={2}>
						{filteredData.map((item) => {
							return (
								<Grid item xs={12} md={6}>
									<ListItem
										key={item.id}
										daysUntilNextPurchase={item.daysUntilNextPurchase}
										dateLastPurchased={item.dateLastPurchased}
										itemId={item.id}
										name={item.name}
										listPath={listPath}
									/>
								</Grid>
							);
						})}
					</Grid>
				</ul>
			</div>
		);
	};

	//Clears input field
	const clearSearch = () => {
		setSearchTerm('');
	};

	return <>{data.length === 0 ? renderAddFirstItemCTA() : renderItemList()}</>;
}

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
import Snackbar from '@mui/material/Snackbar';

export function List({ data, listPath }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState(data);
	const [item, setItem] = useState({ name: '', urgency: '' });
	const [submitted, setSubmitted] = useState();
	const [openSnackbar, setOpenSnackbar] = useState(false);

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
			setSubmitted('Please enter an item to add to your list');
			setOpenSnackbar(true);
			return;
		}

		//Inputs matching exisitng list items return an error
		const match = data.find(
			(item) =>
				item.name.toLowerCase().replace(/[^a-z]/g, '') === submittedItem,
		);

		if (match) {
			setSubmitted('Item already exists!');
			setOpenSnackbar(true);
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
			setSubmitted('Your item was added!');
			setOpenSnackbar(true);
			setItem({ ...item, name: '' });
		} catch (err) {
			console.log(err);
			setSubmitted("Your item wasn't added!");
			setOpenSnackbar(true);
		}
	};

	//Getting the name of the list
	const listName = listPath.split('/')[1];

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
		setSubmitted('');
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
			<section>
				{/* {alertText(submitted)} */}
				<form onSubmit={handleSubmit}>
					{/* Add item form for larger screens */}
					<Box
						sx={{ width: '100%', display: { xs: 'none', md: 'block' }, mr: 1 }}
					>
						<Grid
							container
							alignItems="flex-end"
							spacing={2}
							justifyContent="center"
						>
							<Grid item>
								<Typography variant="h4">Add an item</Typography>
							</Grid>
							<Grid item>
								<FormControl
									variant="standard"
									sx={{ minWidth: { md: 140, lg: 210 } }}
								>
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
								<FormControl
									variant="standard"
									sx={{ minWidth: { md: 165, lg: 210 } }}
								>
									<InputLabel
										id="purchaseUrgencyInput"
										sx={{ fontSize: '0.9rem' }}
									>
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
							<Grid item>
								<Button
									sx={{
										color: (theme) => {
											return theme.palette.mode === 'dark'
												? '#f8f9fa'
												: '#003780';
										},

										border: (theme) => {
											return theme.palette.mode === 'dark'
												? '1px solid #f8f9fa'
												: '1px solid #003780';
										},
										width: '80px',
									}}
									type="submit"
									variant="outlined"
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Box>
					{/* Add item form for smaller screens */}
					<Box sx={{ display: { md: 'none' } }}>
						<Accordion
							sx={{
								border: (theme) => {
									return theme.palette.mode === 'dark'
										? '1.5px solid #f8f9fa'
										: '1.5px solid #003780';
								},
								backgroundColor: (theme) => {
									return theme.palette.mode === 'dark' ? '#003780' : undefined;
								},
							}}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								Add an item +{' '}
							</AccordionSummary>
							{/* {alertText(submitted)} */}
							<AccordionDetails
								sx={{
									display: 'flex',
									flexDirection: { xs: 'column', sm: 'row' },
									flexWrap: 'wrap',
									alignItems: 'center',
									justifyContent: 'center',
									ml: '4px',
									mr: '4px',
								}}
							>
								<FormControl
									variant="standard"
									sx={{ minWidth: { xs: 156, sm: 100 }, mr: 2 }}
								>
									<InputLabel htmlFor="itemName">Enter item name:</InputLabel>
									<Input
										id="itemName"
										placeholder="Item Name"
										value={item.name}
										name="name"
										onChange={handleAddItemChange}
									/>
								</FormControl>
								<FormControl
									variant="standard"
									sx={{ m: 0, minWidth: { xs: 156, sm: 170 }, mr: 2 }}
								>
									<InputLabel
										id="purchaseUrgencyInput"
										sx={{ fontSize: '0.9rem' }}
									>
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
								<Button
									type="submit"
									value="Submit"
									variant="outlined"
									sx={{
										mt: 2,
										border: (theme) => {
											return theme.palette.mode === 'dark'
												? '1px solid #f8f9fa'
												: '1px solid #003780';
										},
										color: (theme) => {
											return theme.palette.mode === 'dark'
												? '#f8f9fa'
												: '#003780';
										},
									}}
								>
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
					<h1>{listName} List</h1>
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
					justifyContent="center"
					spacing={{ xs: 0, md: 2 }}
					mt={1}
					sx={{ mt: { xs: 1 }, mb: { xs: 0 } }}
				>
					<Grid item sx={{ ml: 4, mr: 4 }}>
						<Grid container>
							<Grid item>
								<TripOriginIcon sx={{ color: '#feff70' }} />
							</Grid>
							<Grid item>
								<Typography>Soon: Within 7 days</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item sx={{ ml: 4, mr: 4 }}>
						<Grid container>
							<Grid item>
								<TripOriginIcon sx={{ color: '#80ff00' }} />
							</Grid>
							<Grid item>
								<Typography>Kind of Soon: From 7 to 29 days</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item sx={{ ml: 4, mr: 4 }}>
						<Grid container>
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
								<Grid key={item.id} item xs={12} md={6}>
									<ListItem
										key={item.id}
										daysUntilNextPurchase={item.daysUntilNextPurchase}
										dateLastPurchased={item.dateLastPurchased}
										itemId={item.id}
										name={item.name}
										listPath={listPath}
										setSubmitted={setSubmitted}
										setOpenSnackbar={setOpenSnackbar}
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

	return (
		<>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				message={submitted}
				sx={{
					'& .MuiSnackbarContent-root': {
						backgroundColor: '#f8f9fa',
						color: 'black',
						borderRadius: '5px',
						border: '1px solid #003780',
						display: 'flex',
						justifyContent: 'center',
					},
				}}
			/>
			{data.length === 0 ? renderAddFirstItemCTA() : renderItemList()}
		</>
	);
}

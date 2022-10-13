import { Autocomplete, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import '../App.css';

export default function AddPb() {
	const [ courses, setCourses ] = useState([]);
	const [ err, setErr ] = useState('Searching...');

	const fetchUrl = async () => {
		try {
			const response = await fetch('https://discgolfmetrix.com/api.php?content=courses_list&country_code=FI');
			const json = await response.json();

			let allFinCourses = [];
			for (let i = 0; i < json.courses.length; i++) {
				if(allFinCourses.includes(json.courses[i].Fullname) || json.courses[i].Fullname.includes('&rarr;') ) {
					continue;
				} else {
					allFinCourses.push(json.courses[i].Fullname);
				}
			}

			setCourses(allFinCourses);
			setErr('');
		} catch (error) {
			setErr('Something went wrong :(');
		}
	};

	useEffect(() => {
		fetchUrl();
	}, []);

	if (err.length > 0) {
		<div>{err}</div>;
	}

	return (
		<Box sx={{ display: 'flex', flexFlow: 'row wrap' }}>
			<Box sx={{ maxHeight: '500px', overflow: 'auto', maxWidth: '500px' }}>
				<Typography variant='h4' className="sticky-top">Select course</Typography>
				<Typography variant='h6' className="sticky-top">
					Courselist comes from{' '}
					<a href="https://discgolfmetrix.com/?u=rule&ID=37" rel="noopener noreferrer" target="_blank">
						Metrix API
					</a>
				</Typography>
			
				<Autocomplete 
				className="sticky-top" 
				disableClearable
				options={courses}
				renderInput={(params) => <TextField {...params} label="Search course" InputProps={{
					...params.InputProps,
					type: 'search',
				  }} />}>
				</Autocomplete>
			{/* Tämä jos haluaa näkyville kaikki radat. (hidasti sovellusta)
				<Box>
					{courses.map((course, idx) => {
						return (
							<List key={idx} disablePadding>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemText primary={course}/>
									</ListItemButton>
								</ListItem>
							</List>
						);
					})}
				</Box> */}
			</Box>
		</Box>
	);
}

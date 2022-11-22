import { Autocomplete, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import '../App.css';
import ScoreForm from './ScoreForm';

export default function AddScore() {
	const [ courses, setCourses ] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState('');
	const [ err, setErr ] = useState('Searching...');

//FETCH FINNISH COURSES and sort them to be logical and relevant
	const fetchUrl = async () => {
		try {
			const response = await fetch('https://discgolfmetrix.com/api.php?content=courses_list&country_code=FI');
			const json = await response.json();

			let allFinCourses = [];
			for (let i = 0; i < json.courses.length; i++) {
				if (
					allFinCourses.includes(json.courses[i].Fullname) ||
					json.courses[i].Fullname.includes('&rarr;') ||
					!isNaN(json.courses[i].Fullname.charAt(0))
				) {
					continue;
				} else {
					allFinCourses.push(json.courses[i].Fullname);
				}
			}
			allFinCourses.sort();
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
		<Box sx={{display:'flex', justifyContent: 'space-evenly'}}>
			<Box sx={{ maxHeight: '500px', overflow: 'auto', minWidth:'500px', marginTop:'25px' }}>
				<Typography variant="h4" className="sticky-top">
					Select course
				</Typography>
				<Typography variant="h6" className="sticky-top">
					Courselist comes from{' '}
					<Link href="https://discgolfmetrix.com/?u=rule&ID=37" rel="noopener noreferrer" target="_blank">
						Metrix API
					</Link>
				</Typography>

				<Autocomplete
					onInputChange={(e, newInputValue)=>{
						setSelectedCourse(newInputValue);
					}}
					className="sticky-top"
					disableClearable
					options={courses}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search course"
							InputProps={{
								...params.InputProps,
								type: 'search'
							}}
						/>
					)}
				/>
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
			<ScoreForm selectedCourse = {selectedCourse} courses={courses}/>
		</Box>
	);
}
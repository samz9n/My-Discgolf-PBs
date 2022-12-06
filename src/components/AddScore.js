import { Autocomplete, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import '../App.css';
import ScoreForm from './ScoreForm';

export default function AddScore(props) {
	const [ courses, setCourses ] = useState([]);
	const [ selectedCourse, setSelectedCourse ] = useState('');
	const [ err, setErr ] = useState('Searching...');

	let tempRounds = [];
	props.bestRounds.map((round)=>{
		return tempRounds.push(round.course)
	})

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
		<Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<Box className='rounded-corner' sx={{ maxHeight: '500px', overflow: 'auto', minWidth: '500px', marginTop: '25px' }}>
				<Typography sx={{textAlign:'center'}} variant="h4" className="sticky-top">
					Select course
				</Typography>
				<Typography sx={{textAlign:'center'}} variant="h6" className="sticky-top">
					<em>Courselist comes from{' '}
					<Link href="https://discgolfmetrix.com/?u=rule&ID=37" rel="noopener noreferrer" target="_blank">
						Metrix API
					</Link>
					</em>
				</Typography>

				<Autocomplete
					onInputChange={(e, newInputValue) => {
						setSelectedCourse(newInputValue);
					}}
					className="sticky-top"
					disableClearable
					options={courses}
					/* DISABLES COURSE IF ALREADY ADDED TO BEST ROUNDS */
					getOptionDisabled={(option) => !!tempRounds.find(el=>el===option)}
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
			</Box>
			<ScoreForm
				selectedCourse={selectedCourse}
				setSelectedCourse={setSelectedCourse}
				courses={courses}
				setBestRounds={props.setBestRounds}
			/>
		</Box>
	);
}

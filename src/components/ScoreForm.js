import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

export default function ScoreForm(props) {
	const [ newRound, setNewRound ] = useState({
		course: '',
		score: null,
		holeinones: null,
		birdies: null,
		pars: null,
		bogeys: null,
		doublebogeys: null,
		tripleorworse: null
	});
	const [ message, setMessage ] = useState('');

	const handleChange = (e) => {
		setNewRound({
			...newRound,
			[e.target.name] : e.target.value
		})
	}
	
	/* ADDING NEW ROUND */
	const addRound = async (e) => {
		e.preventDefault();
		const formData = {
			course: props.selectedCourse,
			score: newRound.score,
			holeinones: newRound.holeinones,
			birdies: newRound.birdies,
			pars: newRound.pars,
			bogeys: newRound.bogeys,
			doublebogeys: newRound.doublebogeys,
			tripleorworse: newRound.tripleorworse
		};

		try {
			await axios.post('http://localhost:8080/round/add', formData);
			setNewRound({
				course: '',
				score: null,
				holeinones: null,
				birdies: null,
				pars: null,
				bogeys: null,
				doublebogeys: null,
				tripleorworse: null
			});
			setMessage("Course added to my best rounds")
		} catch (error) {
			setNewRound({});
			setMessage('Failed to add round');
		}
		/* ADDS NEW ROUND TO BESTROUNDS STATE, SO WE DONT NEED TO REFRESH PAGE TO SEE IT */
		props.setBestRounds((prevState)=>{
			return [...prevState, formData]; 
		})
	};

	return (
		<Box
			sx={{
				minWidth: '400px',
				backgroundColor: 'lightgray',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<br />
			{/* IF SELECTED COURSE EXISTS IN COURSES ARRAY */}
			{props.courses.indexOf(props.selectedCourse) > -1 && (
				<Typography variant="h6">
					Add scores for: <br /> {props.selectedCourse}
				</Typography>
			)}
			<FormControl>
				<TextField
					required
					/* inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} */
					sx={{ width: '200px', margin: '5px' }}
					label="Total score"
					name="score"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<TextField
					required
					/* inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} */
					sx={{ width: '200px', margin: '5px' }}
					label="Hole-in-ones"
					name="holeinones"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<TextField
					required
					/* inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} */
					sx={{ width: '200px', margin: '5px' }}
					label="Birdies"
					name="birdies"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<TextField
					required
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
					sx={{ width: '200px', margin: '5px' }}
					label="Pars"
					name="pars"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<TextField
					required
					/* inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} */
					sx={{ width: '200px', margin: '5px' }}
					label="Bogeys"
					name="bogeys"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<TextField
					required
					/* inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} */
					sx={{ width: '200px', margin: '5px' }}
					label="Double-bogeys"
					name="doublebogeys"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<TextField
					required
					/* inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} */
					sx={{ width: '200px', margin: '5px' }}
					label="Triple-Bogeys or worse"
					name="tripleorworse"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
				<Button
					onClick={addRound}
					variant="contained"
					color="primary"
					sx={{ margin: '5px' }}
				>
					submit
				</Button>
			</FormControl>
			{message!=="" && <div>{message}</div>}
		</Box>
	);
}

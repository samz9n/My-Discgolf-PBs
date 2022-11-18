import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';

export default function AddPersonalBest(props) {
	return (
		<Box sx={{minWidth:'400px'}}>
			<br />
			{/* IF SELECTED COURSE EXISTS IN COURSES ARRAY */}
			{props.courses.indexOf(props.selectedCourse) > -1 && 
			<Typography variant='h6'>Add scores for: <br /> {props.selectedCourse}</Typography> }
			<FormControl>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Total score"
					variant="standard"
					multiline
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Hole-in-ones"
					variant="standard"
					multiline
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Birdies"
					variant="standard"
					multiline
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Pars"
					variant="standard"
					multiline
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Bogeys"
					variant="standard"
					multiline
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Double-bogeys"
					variant="standard"
					multiline
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Triple-Bogeys or worse"
					variant="standard"
					multiline
				/>
				<Button
					onClick={() => console.log(props.selectedCourse)}
					variant="contained"
					color="primary"
					sx={{ margin: '5px' }}
				>
					submit
				</Button>
			</FormControl>
		</Box>
	);
}

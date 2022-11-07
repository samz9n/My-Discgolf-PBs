import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React from 'react';

export default function AddPersonalBest() {
	return (
		<Box>
			<br></br>
			<Typography>
				Test div. Here comes the course you have chosen, and here you can set your course stats <br />
				with a form that sends the info to "My personal Bests" page and a database.
			</Typography>
			<FormControl>
				<TextField
					sx={{ width: '200px', margin: '5px'}}
					label="Total score"
					variant="standard"
					multiline
				/>
				<TextField
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Hole-in-ones"
					variant="standard"
					multiline
				/>
				<TextField sx={{ width: '200px', margin: '5px' }} type="text" label="Birdies" variant="standard" multiline />
				<TextField sx={{ width: '200px', margin: '5px' }} type="text" label="Pars" variant="standard" multiline />
				<TextField sx={{ width: '200px', margin: '5px' }} type="text" label="Bogeys" variant="standard" multiline />
				<TextField
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Double-bogeys"
					variant="standard"
					multiline
				/>
				<TextField
					sx={{ width: '200px', margin: '5px' }}
					type="text"
					label="Triple-Bogeys or worse"
					variant="standard"
					multiline
				/>
				<Button variant="contained" color="primary" sx={{ margin: '5px' }}>
					submit
				</Button>
			</FormControl>
		</Box>
	);
}

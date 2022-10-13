import { Box } from '@mui/material';
import React from 'react';

export default function AddPersonalBest() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<p>
				Test div. Here comes the course you have chosen, and here you can set your course stats <br />
				with a form that sends the info to "My personal Bests" page and a database.
			</p>
			<form style={{ display: 'flex', flexDirection: 'column' }}>
				<label>
					Score:
					<input type="text" name="score" />
				</label>
				<label>
					Hole-in-ones:
					<input type="text" name="holeinones" />
				</label>
				<label>
					Birdies:
					<input type="text" name="birdies" />
				</label>
				<label>
					Pars:
					<input type="text" name="pars" />
				</label>
				<label>
					Bogeys:
					<input type="text" name="bogeys" />
				</label>
				<label>
					Double-Bogeys:
					<input type="text" name="doublebogeys" />
				</label>
				<label>
					Triple-Bogeys or worse:
					<input type="text" name="tripleorworse" />
				</label>
				<input type="submit" value="Save stats" />
			</form>
		</Box>
	);
}

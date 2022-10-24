import { Typography } from '@mui/material';
import React from 'react';

export default function MyBestRounds() {
	return (
		<Typography>
			List of courses and my personal bests on them. Here you can edit and remove the course and it's stats.{' '}
			<br />
			This info will be saved in the database and show on the "My personal bests" page.
		</Typography>
	);
}

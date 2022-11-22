import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function MyBestRounds(props) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Button sx={{ margin: '1rem' }} variant="contained" component={Link} to="/addscore">
				Back to adding scores
			</Button>
			{/* IF THERE IS NO ADDED BESTROUNDS, SHOW TEXT */}
			{props.bestRounds.length === 0 && (
				<Typography variant="h6">
					No added personal bests
				</Typography>
			)}
			{
				props.bestRounds.map((round)=>{
					return <Typography>{round.course}</Typography>
				})
			}
			<Outlet></Outlet>
		</Box>
	);
}

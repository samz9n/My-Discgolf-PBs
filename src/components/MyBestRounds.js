import { Box, Typography, Button, Popper, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* COMPONENT TO TOGGLE EACH BESTROUNDS ROUND DETAILS */
const TogglePopper = ({ item, id }) => {
	const [ toggleThisPopper, setToggleThisPopper ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	return (
		<Box key={id}>
			<Button
				size="small"
				onClick={(e) => {
					setToggleThisPopper((prev) => !prev);
					setAnchorEl(anchorEl ? null : e.currentTarget);
				}}
			>
				Round details
			</Button>
			<Popper open={toggleThisPopper} anchorEl={anchorEl}>
				<Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
					<Typography>Hole in ones: {item.holeinones}</Typography>
					<Typography>Birdies: {item.birdies}</Typography>
					<Typography>Pars: {item.pars}</Typography>
					<Typography>Bogeys: {item.bogeys}</Typography>
					<Typography>Double-bogeys: {item.doublebogeys}</Typography>
					<Typography>Triple-bogeys or worse: {item.tripleorworse}</Typography>
				</Box>
			</Popper>
		</Box>
	);
};

export default function MyBestRounds(props) {
	/* DELETE ONE ROUND */
	const deleteRound = async (e) => {
		try {
			await axios.get(`http://localhost:8080/round/delete/${e.target.id}`);
			props.getAllBestRounds();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Button
				sx={{ margin: '1rem' }}
				variant="contained"
				component={Link}
				to="/addscore"
				/* SETS "ADD SCORE"-TAB TO ACTIVE IN NAVBAR */
				onClick={() => {
					props.setNavTabValue('two');
				}}
			>
				Back to adding scores
			</Button>
			{/* IF THERE IS NO ADDED BEST ROUNDS, SHOW TEXT */}
			{props.bestRounds.length === 0 && <Typography variant="h6">No added personal bests</Typography>}

			<Grid sx={{ flexGrow: 1 }} container spacing={2}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" spacing={2}>
						{/* MAP OVER ALL BEST ROUNDS */}
						{props.bestRounds.map((round) => {
							return (
								<Grid key={round.id} item>
									<Paper
										sx={{
											display: 'flex',
											flexDirection: 'column',
											height: 350,
											width: 300,
											textAlign: 'center',
											alignItems: 'center',
											justifyContent: 'space-between',
											background: 'white'
										}}
									>
										<Typography variant="h5">
											<strong>{round.course}</strong>
										</Typography>
										<Typography variant="h3">
											{/* SHOW + SIGN IF SCORE IS BIGGER THAN 0 */}
											<strong>{round.score > 0 ? '+' + round.score : round.score}</strong>
										</Typography>
										{/* TAKES THE CUSTOM COMPONENT "TOGGLEPOPPER" AND PASSES ROUND ATTRIBUTES FROM MAPPED BESTROUNDS */}
										<TogglePopper id={round.id} item={round} />
										{/* EDIT AND REMOVE BUTTONS */}
										<Box
											key={round.id}
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												width: '100%',
												marginTop: '2px'
											}}
										>
											<Button size="small" variant="contained">
												EDIT
											</Button>
											<Button
												id={round.id}
												onClick={deleteRound}
												size="small"
												variant="contained"
												color="error"
											>
												REMOVE
											</Button>
										</Box>
									</Paper>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

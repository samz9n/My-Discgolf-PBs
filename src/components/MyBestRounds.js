import { Box, Typography, Button, Popper, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyBestRounds(props) {
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (event) => {
		const id = event.currentTarget;
		setAnchorEl(anchorEl ? null : id)
		console.log(id)
	};

	const open = Boolean(anchorEl);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Button sx={{ margin: '1rem' }} variant="contained" component={Link} to="/addscore">
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
										<Button name={round.course} size="small" onClick={handleClick}>
											Round details
										</Button>
										<Popper open={open} anchorEl={anchorEl}>
											<Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
												{round.course}
											</Box>
										</Popper>
										<Box
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
											<Button size="small" variant="contained" color="error">
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

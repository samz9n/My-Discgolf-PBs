import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TogglePopper from './TogglePopper';
import EditModal from './EditModal';


export default function MyBestRounds(props) {
	const [openModal, setOpenModal] = useState(false);
	/* const handleOpenModal = () => setOpenModal(true); */
	/* const handleCloseModal = () => setOpenModal(false); */
	/* const [showEditModal, setShowEditModal] = useState(false); */

/* 	const editButtonPress = (e) => {
		setOpenModal(true);
		console.log(openModal)
	}
 */
	/* DELETE ONE ROUND */
	const deleteRound = async (e) => {
		try {
			await axios.get(`http://localhost:8080/round/delete/${e.target.id}`);
		} catch (error) {
			console.log(error);
		}
	};
	/* FETCH BEST ROUNDS WHEN BESTROUNDS ARRAY CHANGES */
	useEffect(()=>{
		props.getAllBestRounds();
	},[props])

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

			<Grid sx={{ flexGrow: 1, marginTop:'1rem' }} container spacing={2}>
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
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												width: '100%',
												marginTop: '2px'
											}}
										>
											<Button onClick={(e)=> setOpenModal(prev => !prev)} size="small" variant="contained">
												EDIT
											</Button>
											{openModal && <EditModal id={round.id} item={round} />}
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
		</Box>
	);
}

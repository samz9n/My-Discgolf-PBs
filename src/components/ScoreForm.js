import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

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
	const [ shownMessage, setShownMessage ] = useState('');

	const handleChange = (e) => {
		setNewRound((prevState)=>({
			 ...prevState,
			[e.target.name] : e.target.value,
			course : props.selectedCourse
		}));
		setShownMessage('');
	}
	
	/* ADDING NEW ROUND */
	const addRound = async (e) => {
		e.preventDefault();
		const formData = {
			course: newRound.course,
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
			props.setSelectedCourse('')
			setShownMessage("Course added to my best rounds")
		} catch (error) {
			setNewRound({});
			setShownMessage('Failed to add round');
		}
	};

	// FORM VALIDATION
	const validationSchema = Yup.object().shape({
		course: Yup.string(),
		score: Yup.number().required().integer().typeError('Score must be a number'),
		holeinones: Yup.number().required().positive().typeError('Cannot be negative').integer().typeError('Hole-in-ones must be a number'),
		birdies: Yup.number().required().positive().typeError('Cannot be negative').integer().typeError('Birdies must be a number'),
		pars: Yup.number().required().positive().typeError('Cannot be negative').integer().typeError('Pars must be a number'),
		bogeys: Yup.number().required().positive().typeError('Cannot be negative').integer().typeError('Bogeys must be a number'),
		doublebogeys: Yup.number().required().positive().typeError('Cannot be negative').integer().typeError('Double-bogeys must be a number'),
		tripleorworse: Yup.number().required().positive().typeError('Cannot be negative').integer().typeError('Triple-bogeys or worse must be a number'),
	})

	const {
		register, 
		handleSubmit, 
		formState: {errors}
	} = useForm({
		resolver: yupResolver(validationSchema)
	});

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
					sx={{ width: '200px', margin: '5px' }}
					label="Total score"
					name="score"
					variant="standard"
					multiline
					value={newRound.score || ""}
					/* NEXT PARTS ARE FOR VALIDATION */
					{...register('score')}
					error={errors.score ? true : false}
					helperText={errors.score?.message}
					/* ----------------------------- */
					onChange={(e)=>handleChange}
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Hole-in-ones"
					name="holeinones"
					variant="standard"
					multiline
					value={newRound.holeinones || ""}
					{...register('holeinones')}
					error={errors.holeinones ? true : false}
					helperText={errors.holeinones?.message}
					onChange={(e)=>handleChange}
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Birdies"
					name="birdies"
					variant="standard"
					multiline
					value={newRound.birdies || ""}
					{...register('birdies')}
					error={errors.birdies ? true : false}
					helperText={errors.birdies?.message}
					onChange={(e)=>handleChange}
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Pars"
					name="pars"
					variant="standard"
					multiline
					value={newRound.pars || ""}
					{...register('pars')}
					error={errors.pars ? true : false}
					helperText={errors.pars?.message}
					onChange={(e)=>handleChange}
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Bogeys"
					name="bogeys"
					variant="standard"
					multiline
					value={newRound.bogeys || ""}
					{...register('bogeys')}
					error={errors.bogeys ? true : false}
					helperText={errors.bogeys?.message}
					onChange={(e)=>handleChange}
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Double-bogeys"
					name="doublebogeys"
					variant="standard"
					multiline
					value={newRound.doublebogeys || ""}
					{...register('doublebogeys')}
					error={errors.doublebogeys ? true : false}
					helperText={errors.doublebogeys?.message}
					onChange={(e)=>handleChange}
				/>
				<TextField
					required
					sx={{ width: '200px', margin: '5px' }}
					label="Triple-Bogeys or worse"
					name="tripleorworse"
					variant="standard"
					multiline
					value={newRound.tripleorworse || ""}
					{...register('tripleorworse')}
					error={errors.tripleorworse ? true : false}
					helperText={errors.tripleorworse?.message}
					onChange={(e)=>handleChange}
				/>
				<Button
					/* FIRST CHECKS IF HANDLESUBMIT (FROM VALIDATION) IS OK, THEN CALLS ADDROUND */
					onClick={handleSubmit(addRound)}
					variant="contained"
					color="primary"
					sx={{ margin: '5px' }}
				>
					submit
				</Button>
			</FormControl>
			{shownMessage!=="" && <div style={{margin:'10px'}}>{shownMessage}!</div>}
		</Box>
	);
}

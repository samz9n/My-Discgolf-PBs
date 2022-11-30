import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

export default function ScoreForm(props) {
	const [ newRound, setNewRound ] = useState({
		course: "",
		score: "",
		holeinones: "",
		birdies: "",
		pars: "",
		bogeys: "",
		doublebogeys: "",
		tripleorworse: ""
	});
	const [ shownMessage, setShownMessage ] = useState('');
	/* DISABLE SUBMIT BUTTON IF ANY FORM INPUT IS EMPTY */
	const [isDisabled, setIsDisabled] = useState(false);
	useEffect(()=> {
		/* SETS THE COURSE TO SELECTED COURSE */
		setNewRound((prevState)=>({
			...prevState,
		   course : props.selectedCourse
	   }));
		for(let item in newRound) {
			if(newRound[item]==="" || props.selectedCourse==="") {
				setIsDisabled(true);
			} else {
				setIsDisabled(false);
			}
		}
	},[newRound, props.selectedCourse])

	const handleChange = (e) => {
		setNewRound((prevState)=>({
			 ...prevState,
			[e.target.name] : e.target.value,
			/* course : props.selectedCourse */
		}));
		setShownMessage('');
		/* CLEAR VALIDATION ERRORS WHEN FIELD IS EMPTY */
		if(e.target.value==="") {
			clearErrors(e.target.name)
		}
	}
	
	/* ADDING NEW ROUND */
	const addRound = async (e) => {
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
				score: "",
				holeinones: "",
				birdies: "",
				pars: "",
				bogeys: "",
				doublebogeys: "",
				tripleorworse: ""
			});
			props.setSelectedCourse('')
			setShownMessage("Course added to my best rounds")
		} catch (error) {
			setNewRound({});
			setShownMessage('Failed to add round');
		}
	};

	// FORM VALIDATION WITH 3RD PARTY LIBRARY YUP
	const validationSchema = Yup.object().shape({
		course: Yup.string(),
		score: Yup.number().required().integer().typeError('Score must be a number'),
		holeinones: Yup.number().required().min(0).integer().typeError('Hole-in-ones must be a number'),
		birdies: Yup.number().required().min(0).integer().typeError('Birdies must be a number'),
		pars: Yup.number().required().min(0).integer().typeError('Pars must be a number'),
		bogeys: Yup.number().required().min(0).integer().typeError('Bogeys must be a number'),
		doublebogeys: Yup.number().required().min(0).integer().typeError('Double-bogeys must be a number'),
		tripleorworse: Yup.number().required().min(0).integer().typeError('Triple-bogeys or worse must be a number'),
	})

	const {
		register, 
		handleSubmit, 
		formState: {errors},
		clearErrors
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
				alignItems: 'center',
				marginTop: '1.4rem'
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
					onChange={(e)=>handleChange(e)}
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
					onChange={(e)=>handleChange(e)}
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
					onChange={(e)=>handleChange(e)}
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
					onChange={(e)=>handleChange(e)}
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
					onChange={(e)=>handleChange(e)}
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
					onChange={(e)=>handleChange(e)}
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
					onChange={(e)=>handleChange(e)}
				/>
				<Button
					/* FIRST CHECKS IF HANDLESUBMIT (FROM VALIDATION) IS OK, THEN CALLS ADDROUND */
					onClick={handleSubmit(addRound)}
					variant="contained"
					color="primary"
					sx={{ margin: '5px' }}
					disabled={isDisabled}
				>
					submit
				</Button>
			</FormControl>
			{shownMessage!=="" && <div style={{margin:'10px'}}>{shownMessage}!</div>}
		</Box>
	);
}

import React, {useState} from 'react';
import { Box, Button, FormControl, TextField, Typography, Modal } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({item, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [ editRound, setEditRound ] = useState({
    course: "",
    score: "",
    holeinones: "",
    birdies: "",
    pars: "",
    bogeys: "",
    doublebogeys: "",
    tripleorworse: ""
});
    const [ showMessage, setShowMessage ] = useState('');

    const handleChange = (e) => {
    setEditRound((prevState)=>({
         ...prevState,
        [e.target.name] : e.target.value
    }));
    setShowMessage('');
    /* CLEAR VALIDATION ERRORS WHEN FIELD IS EMPTY */
    if(e.target.value==="") {
        clearErrors(e.target.name)
    }
    }

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
		/* handleSubmit,  */
		formState: {errors},
		clearErrors
	} = useForm({
		resolver: yupResolver(validationSchema)
	});

  return (
    <div key={id} style={{display:'flex', justifyContent:'end'}}>
        <button style={{heigth:'30px'}} onClick={handleOpen}>EDIT ROUND</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box
                sx={{
                    position:'relative',
                    minWidth: '300px',
                    backgroundColor: 'lightgray',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '1.4rem'
                }}
                >
                <Typography variant="h6">{item.course}</Typography>
                <FormControl>
                    <TextField
                        required
                        sx={{ width: '200px', margin: '5px' }}
                        label="Total score"
                        name="score"
                        variant="standard"
                        multiline
                        defaultValue={item.score}
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
                        defaultValue={item.holeinones}
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
                        defaultValue={item.birdies}
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
                        defaultValue={item.pars}
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
                        defaultValue={item.bogeys}
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
                        defaultValue={item.doublebogeys}
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
                        defaultValue={item.tripleorworse}
                        {...register('tripleorworse')}
                        error={errors.tripleorworse ? true : false}
                        helperText={errors.tripleorworse?.message}
                        onChange={(e)=>handleChange(e)}
                    />
                    <Button
                        /* FIRST CHECKS IF HANDLESUBMIT (FORM VALIDATION) IS OK, THEN CALLS EDITROUND */
                        /* onClick={handleSubmit(editRound)} */
                        variant="contained"
                        color="primary"
                        sx={{ margin: '5px' }}
                        disabled={editDisabled}
                    >
                        save
                    </Button>
                </FormControl>
                {showMessage!=="" && <div style={{margin:'10px'}}>{showMessage}!</div>}
            </Box>
        </Box>
      </Modal>
    </div>
  );
}
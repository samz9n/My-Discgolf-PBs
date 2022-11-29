import { useState } from "react";
import { Box, Typography, Button, Popper} from '@mui/material';

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
export default TogglePopper;
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
				<Box className="rounded-corner" sx={{ border: 1, p: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems:'center' }}>
					<Typography sx={{fontSize:'1.3rem'}}>Hole in ones: {item.holeinones}</Typography>
					<Typography sx={{fontSize:'1.3rem'}}>Birdies: {item.birdies}</Typography>
					<Typography sx={{fontSize:'1.3rem'}}>Pars: {item.pars}</Typography>
					<Typography sx={{fontSize:'1.3rem'}}>Bogeys: {item.bogeys}</Typography>
					<Typography sx={{fontSize:'1.3rem'}}>Double-bogeys: {item.doublebogeys}</Typography>
					<Typography sx={{fontSize:'1.2rem'}}>Triple-bogeys or worse: {item.tripleorworse}</Typography>
				</Box>
			</Popper>
		</Box>
	);
};
export default TogglePopper;
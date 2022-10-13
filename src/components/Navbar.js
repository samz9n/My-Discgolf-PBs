import { React, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import '../App.css';

export default function Navbar() {
	const [ value, setValue ] = useState(0);

	const handleChange = (e, val) => {
		setValue(val);
	};

	return (
		<Box>
			<Tabs
				value={value}
				onChange={handleChange}
				sx={{ textAlign: 'center' }}
				indicatorColor="secondary"
				textColor="inherit"
			>
				<Tab label="HOME" />
				<Tab label="ADD PERSONAL BEST" />
				<Tab label="MY BEST ROUNDS" />
			</Tabs>
		</Box>
	);
}

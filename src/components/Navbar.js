import { React, useState } from 'react';
import { Box, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import '../App.css';
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
	const [ value, setValue ] = useState('one');

	const handleChange = (e, val) => {
		setValue(val);
	};

	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="inherit"
						indicatorColor="secondary"
						aria-label="secondary tabs example"
					>
						<Tab value="one" label="Home" component={Link} to='home' />
						<Tab value="two" label="Add Score" component={Link} to='selectcourse' />
						<Tab value="three" label="My Best Rounds" component={Link} to='mybestrounds' />
					</Tabs>
				</Toolbar>
			</AppBar>
			<Outlet></Outlet>
		</Box>
	);
}

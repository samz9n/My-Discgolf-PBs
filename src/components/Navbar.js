import { React, useState } from 'react';
import { Box, AppBar, Toolbar, Tabs, Tab, Typography } from '@mui/material';
import '../App.css';
import { Link, Outlet } from "react-router-dom";

export default function Navbar(props) {
	

	const handleChange = (e, val) => {
		props.setNavTabValue(val);
	};

	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
				<Typography className='transformed-text' variant='h6' sx={{marginRight:'20px'}}>MYDISCGOLFPBS</Typography>
					<Tabs
						value={props.navTabValue}
						onChange={handleChange}
						textColor="inherit"
						indicatorColor="secondary"
						aria-label="secondary tabs example"
					>
						<Tab value="one" label="Home" component={Link} to='home' />
						<Tab value="two" label="Add Score" component={Link} to='addscore' />
						<Tab value="three" label="My Best Rounds" component={Link} to='mybestrounds' />
					</Tabs>
				</Toolbar>
			</AppBar>
			<Outlet></Outlet>
		</Box>
	);
}

import React, { useEffect, useState } from 'react';
import '../App.css';

export default function AddPb() {
	const [ courses, setCourses ] = useState([]);
	const [ err, setErr ] = useState('Searching...');

	const fetchUrl = async () => {
		try {
			const response = await fetch('https://discgolfmetrix.com/api.php?content=courses_list&country_code=FI');
			const json = await response.json();

			let allFinCourses = [];
			for (let i = 0; i < json.courses.length; i++) {
				allFinCourses.push(json.courses[i].Fullname);
			}

			setCourses(allFinCourses);
			setErr('');
		} catch (error) {
			setErr('Something went wrong :(');
		}
	};

	useEffect(() => {
		fetchUrl();
	}, []);

	if (err.length > 0) {
		<div>{err}</div>;
	}

	return (
		<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
			<div style={{ maxHeight: '500px', overflow: 'auto', maxWidth: '500px' }}>
				<h2 className="sticky-top">Select course</h2>
        <h3>Courselist comes from <a href="https://discgolfmetrix.com/?u=rule&ID=37" rel="noopener noreferrer" 
        target="_blank">Metrix API</a></h3>
				<ul>
					{courses.map((course, id) => {
						return <li key={id}>{course}</li>;
					})}
				</ul>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<p>
					Test div. Here comes the course you have chosen, and here you can set your course stats <br />
					with a form that sends the info to "My personal Bests" page and a database.
				</p>
				<form style={{ display: 'flex', flexDirection: 'column' }}>
					<label>
						Score:
						<input type="text" name="score" />
					</label>
					<label>
						Hole-in-ones:
						<input type="text" name="holeinones" />
					</label>
					<label>
						Birdies:
						<input type="text" name="birdies" />
					</label>
					<label>
						Pars:
						<input type="text" name="pars" />
					</label>
					<label>
						Bogeys:
						<input type="text" name="bogeys" />
					</label>
					<label>
						Double-Bogeys:
						<input type="text" name="doublebogeys" />
					</label>
					<label>
						Triple-Bogeys or worse:
						<input type="text" name="tripleorworse" />
					</label>
					<input type="submit" value="Save stats" />
				</form>
			</div>
		</div>
	);
}

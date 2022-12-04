import './App.css';
import AddScore from './components/AddScore';
import MyBestRounds from './components/MyBestRounds';
import Navbar from './components/Navbar';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [ navTabValue, setNavTabValue ] = useState('one');
	const [bestRounds, setBestRounds] = useState([]);
	const [err, setErr] = useState('Loading...');
	const getAllBestRounds = async () => {
		try {
			const response = await axios.get('http://localhost:8080/round/all')
			setBestRounds(response.data)
			setErr('')
		}
		catch{
			setBestRounds([]);
			setErr('Could not fetch data');
		}
	}

	useEffect(()=>{
		getAllBestRounds();
	},[])

	if (err.length > 0) {
		return ( <div>{ err }</div> );
	  }
   
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navbar setNavTabValue={setNavTabValue} navTabValue={navTabValue} />}>
					<Route index element={<Home />} />
					<Route path="addscore" element={<AddScore bestRounds={bestRounds} setBestRounds={setBestRounds} />} />
					<Route path="mybestrounds" element={<MyBestRounds bestRounds={bestRounds} setNavTabValue={setNavTabValue} getAllBestRounds={getAllBestRounds} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

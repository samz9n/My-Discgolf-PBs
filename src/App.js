import './App.css';
import SelectCourse from './components/SelectCourse';
import MyBestRounds from './components/MyBestRounds';
import Navbar from './components/Navbar';
import Home from './components/Home'
/* import AddPersonalBest from './components/AddPersonalBest'; */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path="home" element={<Home />} />
					<Route path="selectcourse" element={<SelectCourse />} />
					<Route path="mybestrounds" element={<MyBestRounds />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

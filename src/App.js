import './App.css';
import SelectCourse from './components/SelectCourse'
import MyBestRounds from './components/MyBestRounds';
import Navbar from "./components/Navbar"
import AddPersonalBest from './components/AddPersonalBest';

function App() {
  return (
    <div> 
        <Navbar />
        <SelectCourse />
        <MyBestRounds />
        <AddPersonalBest />
    </div>
  );
}

export default App;

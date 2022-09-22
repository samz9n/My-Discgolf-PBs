import './App.css';
import AddPb from './components/AddPb';
import MyBestRounds from './components/MyBestRounds';
import Navbar from "./components/Navbar"

function App() {
  return (
    <div> 
      <nav>
        <Navbar />
      </nav>
      <div>
        <AddPb />
      </div>
      <div>
        <MyBestRounds />
      </div>
    </div>
  );
}

export default App;

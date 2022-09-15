import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import Navbar from './component/Navbar';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"; 
import Product from './component/Products';


function App() {
  return (
    <>
    <NoteState>
      <Router> 
      <Navbar/>
        <Routes>
        <Route exact path="/" element={<Product/>}/>
        <Route exact path="/Login" element={<Login />}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

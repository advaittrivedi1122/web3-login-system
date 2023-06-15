import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/home" element={<Home />}></Route>
    {/* <div className="App">
      <header className="App-header">
      </header>
      <Login /> 
    </div> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home';
import ChatMain from './components/Chatroom/ChatMain';
import EditUser from './components/User/EditUser';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/chatroom/:username/' element={<ChatMain/>}/>
      </Routes>
    </div>
  );
}

export default App;

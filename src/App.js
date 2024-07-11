import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import {WebSocketProvider} from "./context/WebSocketContext";
import ExamplePage from "./pages/ExamplePage";
import NotFound from "./pages/NotFound";

function App() {


  return (
      <div className="App d-flex">
          <WebSocketProvider url='ws://scaleserver:8080/gshowd'>
              <BrowserRouter>
                  <SideBar instrumentName={'INSTRUMENT NAME'}/>
                  <div className='App flex-grow-1'>
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/examplepage" element={<ExamplePage/>} />
                          <Route path='*' element={<NotFound/>} />
                      </Routes>
                  </div>
              </BrowserRouter>
          </WebSocketProvider>
      </div>
  );
}

export default App;

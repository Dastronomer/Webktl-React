import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import ExamplePage from "./pages/ExamplePage";
import NotFound from "./pages/NotFound";
import {WebSocketProvider1} from "./context/WebSocketProviders";

function App() {

////////////////////////////////////////////////////////////////
    const url = 'wss://scaleserver.ucolick.org:8081/gshowd';
    const serviceName = "pie"
    const instrumentName = "INSTRUMENT NAME"
////////////////////////////////////////////////////////////////


    const commandArgs = `-c -jsonsingle -prefix -s ${serviceName} +attr`;
    const modifiedCommand = commandArgs.split(" ").join("&");

    return (
        <div className="App d-flex">
            <WebSocketProvider1 url={url} command={modifiedCommand}>
                <BrowserRouter>
                    <SideBar instrumentName={instrumentName}/>
                    <div className='App'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/examplepage" element={<ExamplePage/>} />
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </WebSocketProvider1>
        </div>
    );
}

export default App;

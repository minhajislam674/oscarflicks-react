import './App.css';
import { MainView } from './components/main-view/main-view';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
        <MainView/>
        <ToastContainer />
    </div>
  );
}

export default App;

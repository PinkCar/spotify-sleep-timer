import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SleepTimerMenu from './SleepTimerMenu'
import Home from './Home'
import Redirect from './Redirect';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sleep-timer-menu" element={<SleepTimerMenu />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/undefined"/>
      </Routes>
    </Router>
  )
}


export default App;
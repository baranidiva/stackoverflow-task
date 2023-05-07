import './App.css';
import Questions from './components/Questions';
import QuestionDetail from './components/Questions-details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddQuestion from './components/Questions-add';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Questions/>} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/addquestion" element={<AddQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;

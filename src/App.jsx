import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FamilyForm from './components/FamilyForm';
import FamilyList from './components/FamilyList';
import './App.css';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence>
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FamilyForm />
              </motion.div>
            } />
            <Route path="/family-list" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FamilyList />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { slideService } from './services/slideService';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await slideService.fetchAllProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return <div className="App"><h1>Loading projects...</h1></div>;
  }

  if (error) {
    return <div className="App"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="App">
      <Carousel projects={projects} />
    </div>
  );
}

export default App;
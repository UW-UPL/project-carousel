import { useState, useEffect, useRef } from 'react';
import { slideService } from './services/slideService';
import { config } from './config';
import { registerSW } from './serviceWorkerRegistration';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  // Projects currently being displayed in the carousel
  const [projects, setProjects] = useState([]);

  // Buffered projects (updated by background polling)
  // Synced to active projects only when carousel loops back to index 0
  const bufferProjects = useRef([]);
  // Set to true when buffer is different than current projects
  const pendingUpdate = useRef(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  
  useEffect(() => {
    // Register service worker for image caching
    registerSW();
    
    // Initial projects load
    async function loadProjects() {
      try {
        const data = await slideService.fetchAllProjects();
        setProjects(data);
        bufferProjects.current = data;
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadProjects();

    // Set up polling
    const pollInterval = setInterval(async () => {
      try {
        const newProjects = await slideService.fetchAllProjects();
        
        // prefetch images into browser cache
        bufferProjects.current.forEach((slide)=> {
          slide.imageUrls.forEach((url)=> {
            fetch(url)
          })
        })

        // Check if projects have changed
        if (JSON.stringify(newProjects) !== JSON.stringify(bufferProjects.current)) {
          console.log('Projects changed, staging update');
          bufferProjects.current = newProjects;
          pendingUpdate.current = true;
        }
      } catch (err) {
        console.log(err)
        console.log("api is down :(")
      }
    }, config.pollInterval);

    return () => clearInterval(pollInterval);
  }, []);

  // Function to sync buffer to active projects (called from Carousel)
  const syncProjects = () => {
    if (pendingUpdate.current) {
      console.log('Syncing projects at loop start');
      setProjects([...bufferProjects.current]);
      pendingUpdate.current = false;
    }
  };

  if (loading) {
    return <div className="App"><h1>Loading projects...</h1></div>;
  }

  if (error) {
    return <div className="App"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="App">
      <Carousel projects={projects} onLoopStart={syncProjects} />
    </div>
  );
}

export default App;
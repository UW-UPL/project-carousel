import { useState, useEffect } from 'react';
import { config } from '../config';
import Layout1 from './Layout1';

function Carousel({ projects, onLoopStart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (projects.length === 0) return;

    const duration = config.defaultSlideDuration;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % projects.length;
        
        // Check if we're looping back to start
        if (nextIndex === 0 && onLoopStart) {
          onLoopStart();
        }
        
        return nextIndex;
      });
    }, duration);

    return () => clearInterval(timer);
  }, [currentIndex, projects, onLoopStart]);

  function getLayoutComponent() {
    switch (currentProject.layout) {
      case 'layout1':
        return Layout1;
      default:
        console.warn(`Unknown layout: ${currentProject.layout}, falling back to Layout1`);
        return Layout1;
    }
  };
  
  if (projects.length === 0) {
    return <div>No projects to display</div>;
  }

  const currentProject = projects[currentIndex];
  const LayoutComponent = getLayoutComponent()

  return (
    <div className="carousel">
      <LayoutComponent project={currentProject} />
    </div>
  );
}


export default Carousel;
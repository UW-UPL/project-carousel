import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { config } from '../config';

function Carousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (projects.length === 0) return;

    const duration = projects[currentIndex].duration * 1000 || config.defaultSlideDuration;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, duration);

    return () => clearInterval(timer);
  }, [currentIndex, projects]);

  if (projects.length === 0) {
    return <div>No projects to display</div>;
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="carousel">
      <div className="slide">
        <h1>{currentProject.title}</h1>
        <div className="description">
        <ReactMarkdown>{currentProject.description}</ReactMarkdown>
        </div>
        <div className="metadata">
          <p>By: {currentProject.metadata.author}</p>
          <p>Date: {currentProject.metadata.date}</p>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
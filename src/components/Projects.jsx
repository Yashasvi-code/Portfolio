import { useState, useEffect, useRef } from 'react';
import './Projects.css';
import hoverSoundFile from '../assets/hover-sound.mp3';
import clickSoundFile from '../assets/click.mp3';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const hoverSound = useRef(null);
  const clickSound = useRef(null);

  const projects = [
    {
      id: "MARK-I",
      title: "Interview Salah",
      description: "",
      status: "Deployed",
      tech: ["Next.js", "React.js", "Python" , "PostgreSQL"],
      image: "./src/assets/Interview-Salah.png", 
      demoUrl: "",
      githubUrl: ""
    },
    {
      id: "MARK-II",
      title: "BrainBoost",
      description: "BrainBoost: A Modern AI-Powered Learning Platform",
      status: "Deployed",
      tech: ["React", "ECharts", "Tailwind CSS"],
      image: "./src/assets/BrainBoost.png", 
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }, {
      id: "MARK-III",
      title: "Saathi-AI",
      description: "AI-powered co-pilot that transforms your LinkedIn outreach ",
      status: "Deployed",
      tech: ["React", "Node.js", "MongoDB"],
      image: "./src/assets/Saathi.ai.png", 
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      id: "MARK-Ⅳ",
      title: "Bhugol Watch",
      description: " Robust Change Detection, Monitoring, and Alert System on User-defined AOIs.",
      status: "Deployed",
      tech: ["React", "Firebase", "Tailwind CSS"],
      image: "./src/assets/Bhugol-Watch.png",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }, {
      id: "MARK-V",
      title: "AyurSutra Prototype",
      description: "AyurSutra- Panchakarma Patient Management and therapy scheduling Software",
      status: "Deployed",
      tech: ["HTML", "React.js", "Tailwind CSS"],
      image: "./src/assets/AyurSutra.png",
      demoUrl: "https://ayursutra-prototype.vercel.app/",
      githubUrl: "https://github.com/Yashasvi-code/prototype.git"
    }, {
      id: "MARK-VI",
      title: "Sutramed",
      description: "Collaborative project management tool",
      status: "Complete",
      tech: ["React", "Firebase", "Tailwind CSS"],
      image: "./src/assets/Sutramed.png",
      demoUrl: "",
      githubUrl: ""
    }
  ];

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const playHoverSound = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

  const stopHoverSound = () => {
    if (hoverSound.current) {
      hoverSound.current.pause();
    }
  };

  const playClickSound = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  // Initialize cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="stark-projects-container" onMouseLeave={stopHoverSound}>
      {/* Audio elements */}
      <audio ref={hoverSound} src={hoverSoundFile} />
      <audio ref={clickSound} src={clickSoundFile} />
      <div className="stark-projects-header">
        <h2>STARK INDUSTRIES R&D ARCHIVES</h2>
        <div className="stark-projects-subtitle">PROJECT DEPLOYMENT RECORDS</div>
      </div>
      
      <div className="stark-projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="stark-project-card"
            onClick={() => {
              playClickSound();
              openProjectDetail(project);
            }}
            onMouseEnter={playHoverSound}
          >
            <div className="stark-project-id">{project.id}</div>
            <div className="stark-project-image-container">
              <img src={project.image} alt={project.title} className="stark-project-image" />
              <div className="stark-project-scanlines"></div>
            </div>
            <div className="stark-project-info">
              <h3 className="stark-project-title">{project.title}</h3>
              <p className="stark-project-description">{project.description}</p>
            </div>
            <div className="stark-project-status">{project.status}</div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="stark-modal-overlay" onClick={closeProjectDetail}>
          <div className="stark-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="stark-modal-header">
              <h2>{selectedProject.id}: {selectedProject.title}</h2>
              <button className="stark-modal-close" onClick={closeProjectDetail}>✕</button>
            </div>
            <div className="stark-modal-body">
              <div className="stark-modal-image-container">
                <img src={selectedProject.image} alt={selectedProject.title} />
                <div className="stark-modal-scanlines"></div>
              </div>
              <div className="stark-modal-details">
                <div className="stark-modal-description">
                  <h3>PROJECT OVERVIEW</h3>
                  <p>{selectedProject.description}</p>
                </div>
                <div className="stark-modal-tech">
                  <h3>TECHNOLOGY IMPLEMENTED</h3>
                  <div className="stark-tech-tags">
                    {selectedProject.tech.map((tech, index) => (
                      <span key={index} className="stark-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                {/* <div className="stark-modal-links">
                  <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="stark-btn stark-btn-primary">
                    VIEW DEPLOYMENT
                  </a>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="stark-btn stark-btn-secondary">
                    SOURCE CODE
                  </a>
                </div> */}
              </div>
            </div>
            <div className="stark-modal-footer">
              <div className="stark-modal-status">STATUS: {selectedProject.status}</div>
              <div className="stark-modal-date">LAST UPDATED: 03.02.2025</div>
            </div>
          </div>

          <div
            className="custom-cursor hidden md:block fixed w-8 h-8 pointer-events-none z-50 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 mix-blend-difference"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              opacity: 1,
              zIndex: 1002,
            }}
          ></div>
        </div>
      )}
      
    </div>
    
  );
};

export default Projects;

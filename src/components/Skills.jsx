// src/components/Skills.jsx
import { useState, useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const [selectedArmor, setSelectedArmor] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const skillsRef = useRef(null);
  const audioRef = useRef(null);

  // Initialize audio and cursor tracking
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("./src/assets/iron-man-repulsor.mp3");
    audioRef.current.loop = false;

    // Cursor tracking
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleArmorClick = (armor) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedArmor(armor);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleCloseShowcase = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedArmor(null);
    
    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Skill categories data
  const skillCategories = [
    {
      id: 1,
      name: "Frontend",
      armorImage: "./src/assets/frontend.full.png", // Replace with actual image path
      color: "red",
      skills: ["React", "Vue", "Angular", "HTML/CSS", "JavaScript", "TypeScript"]
    },
    {
      id: 2,
      name: "Backend",
      armorImage: "/src/assets/backend (2).png", // Replace with actual image path
      color: "blue",
      skills: ["Node.js", "Python", "Java", "PHP", "Database Management", "API Design"]
    },
    {
      id: 3,
      name: "UI/UX Design",
      armorImage: "./src/assets/UI-UX.png", // Replace with actual image path
      color: "purple",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing", "Design Systems"]
    },
    {
      id: 4,
      name: "DevOps",
      armorImage: "./src/assets/DevOops.png", // Replace with actual image path
      color: "green",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "Terraform"]
    },
    {
      id: 5,
      name: "Mobile Development",
      armorImage: "./src/assets/mobile.png", // Replace with actual image path
      color: "orange",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android"]
    }
  ];

  // const handleArmorClick = (armor) => {
  //   if (isAnimating) return;
  //   setIsAnimating(true);
  //   setSelectedArmor(armor);
    
  //   // Reset animation state after animation completes
  //   setTimeout(() => setIsAnimating(false), 1000);
  // };

  // const handleCloseShowcase = () => {
  //   if (isAnimating) return;
  //   setIsAnimating(true);
  //   setSelectedArmor(null);
    
  //   // Reset animation state after animation completes
  //   setTimeout(() => setIsAnimating(false), 1000);
  // };

  return (
    <div className="skills-container" ref={skillsRef}>
      {selectedArmor ? (
        <ArmorShowcase
          armor={selectedArmor}
          onClose={handleCloseShowcase}
          isAnimating={isAnimating}
          cursorPosition={cursorPosition}
        />
      ) : (
        <ArmorHall 
          armors={skillCategories} 
          onArmorClick={handleArmorClick} 
          isAnimating={isAnimating}
        />
      )}
    </div>
  );
};

// Armor Hall Component (initial view)
const ArmorHall = ({ armors, onArmorClick, isAnimating }) => {
  return (
    <div className={`armor-hall ${isAnimating ? 'animating' : ''}`}>
      <h2 className="hall-title">HALL OF ARMOR</h2>
      <p className="hall-subtitle">Select a suit to view my skills</p>
      
      <div className="armors-container">
        {armors.map((armor) => (
          <div 
            key={armor.id}
            className={`armor-item ${isAnimating ? 'disabled' : ''}`}
            onClick={() => onArmorClick(armor)}
          >
            <div className="armor-image-container">
              <img src={armor.armorImage} alt={armor.name} className="armor-image" />
              <div className={`armor-glow ${armor.color}`}></div>
            </div>
            <div className="armor-name">{armor.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Armor Showcase Component (detailed view)
const ArmorShowcase = ({ armor, onClose, isAnimating, cursorPosition }) => {
  return (
    <div className={`armor-showcase ${isAnimating ? 'animating' : ''}`}>
      <button className="close-button" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>

      <div className="showcase-container">
        <div className="neon-platform"></div>

        <div className="selected-armor">
          <div className="armor-image-container">
            <img src={armor.armorImage} alt={armor.name} className="armor-image" />
            <div className={`armor-glow ${armor.color} active`}></div>
          </div>
          <div className="armor-title">{armor.name} SUIT</div>
        </div>

        <div className="skills-display">
          <div className="skills-title">SKILLS ACTIVATED</div>
          <div className="skills-grid">
            {armor.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="skill-name">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id='cursor'
        className="custom-cursor hidden md:block fixed w-8 h-8 pointer-events-none z-50 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: 1,
          zIndex: 1002,
        }}
      ></div>
    </div>
  );
};

export default Skills;
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorScale, setCursorScale] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);


  // Handle cursor position and scale effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseEnter = () => {
      setCursorScale(2);
    };
    const handleMouseLeave = () => {
      setCursorScale(1);
    };
    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .cursor-pointer'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Clean up interactive element listeners
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .cursor-pointer'
      );
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
  // Preloader effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setLoading(false);
            }, 300);
            return 100;
          }
          return newProgress;
        });
      }, 60);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);
  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="font-sans min-h-screen bg-black text-white">
      {/* Preloader */}
      {loading && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-transform duration-500 transform">
          <div className="relative w-16 h-16 mb-8">
            <div className="absolute w-full h-full border-2 border-gray-700 rounded-full"></div>
            <div
              className="absolute w-full h-full border-t-2 border-white rounded-full animate-spin"
              style={{ animationDuration: "1.5s" }}
            ></div>
          </div>
          <div className="text-2xl font-light tracking-widest mb-4">
            LOADING
          </div>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-500">{loadingProgress}%</div>
        </div>
      )}
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-wider">
            <a href="#home" className="hover:text-gray-300 transition-colors">
              YASHASVI TIWARI
            </a>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => navigateTo(item)}
                      className={`uppercase text-sm tracking-widest py-2 !rounded-button whitespace-nowrap cursor-pointer hover:text-white transition-colors ${
                        activeSection === item ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 relative focus:outline-none z-50 !rounded-button whitespace-nowrap cursor-pointer"
            onClick={toggleMenu}
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={`block absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0 w-0" : "opacity-100 w-5"
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>
        </div>
        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center transition-opacity duration-300 md:hidden ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-center space-y-8">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => navigateTo(item)}
                  className={`uppercase text-2xl tracking-widest py-2 !rounded-button whitespace-nowrap cursor-pointer ${
                    activeSection === item ? "text-white" : "text-gray-400"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        {/* Hero Section */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url('https://static.readdy.ai/image/78d823d9acec4a242f91f8f6f1d8e7cf/4e2900369d74cd4c6e58c53118aedf65.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            style={{
              background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(50, 50, 50, 0.4) 0%, rgba(0, 0, 0, 0.95) 70%)`,
            }}
          ></div>
          <div className="container mx-auto px-6 z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight mb-6 opacity-80"
                style={{
                  transform: `perspective(1000px) rotateX(${
                    (cursorPosition.y - window.innerHeight / 2) * 0.01
                  }deg) rotateY(${
                    (cursorPosition.x - window.innerWidth / 2) * 0.01
                  }deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="overflow-hidden perspective-1000">
                  <span className="block transform translate-y-0 animate-fadeInUp transition-transform duration-300 cursor-default">
                    CREATIVE
                  </span>
                </div>
                <div className="overflow-hidden perspective-1000">
                  <span className="block transform translate-y-0 animate-fadeInUp animation-delay-300 transition-transform duration-300 cursor-default">
                    WEB
                  </span>
                </div>
                <div className="overflow-hidden perspective-1000">
                  <span className="block transform translate-y-0 animate-fadeInUp animation-delay-600 transition-transform duration-300 cursor-default">
                    DEVELOPER
                  </span>
                </div>
              </h1>
              <p className="text-xl text-gray-300 mb-10 animate-fadeIn animation-delay-900">
                Crafting digital experiences that merge creativity with
                technical excellence
              </p>
              <div className="flex justify-center space-x-4 animate-fadeIn animation-delay-1200">
                <button
                  onClick={() => navigateTo("projects")}
                  className="px-8 py-3 bg-white text-black text-sm uppercase tracking-wider font-medium hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  View Projects
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className="px-8 py-3 border border-white text-white text-sm uppercase tracking-wider font-medium hover:bg-white hover:bg-opacity-10 transition-all !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-24 bg-black relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 px-4">
              <div className="relative">
                <h2 className="text-[90px] font-serif leading-none mb-4">
                  <span className="text-[#550000]">About</span>
                  <br />
                  <span className="text-white">Me...</span>
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  I started my journey in 2020 and have worked with top brands
                  like Google, YouTube, IBM, Country Delight, Magic EdTech,
                  Rapido, and more.
                </p>
                <p className="text-gray-300 text-lg mb-8">
                  I specialize in designing visually compelling websites,
                  immersive 3D web experiences, and intuitive UI/UX solutions
                  that enhance user engagement. My expertise extends to
                  branding, packaging, architectural design, and digital
                  storytelling, ensuring that every project is both
                  aesthetically striking and functionally seamless.
                </p>
                 <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/public/Portfolio_Resume.pdf';
            link.download = 'Yashasvi_Tiwari_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
                  className="inline-flex items-center px-6 py-3 bg-white text-black text-sm uppercase tracking-wider font-medium hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Download Resume <i className="fas fa-download ml-2"></i>
                </button>
                <div className="absolute -bottom-20 right-0">
                  <div className="relative w-32 h-32">
                    <img
                      src="https://public.readdy.ai/ai/img_res/10c34ac2-1ed6-4f4b-9a19-eed0b974d5af.jpg"
                      alt="Logo"
                      className="w-full h-full object-contain animate-spin-slow"
                    />
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-4 right-4 text-right z-10">
                  <p className="text-[#550000] text-xl font-bold mb-1">Yashasvi Tiwari</p>
                  <p className="text-white text-xl">Web Developer</p>
                </div>
                <div
                  className="relative overflow-hidden rounded-3xl group perspective-1000"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rotateX = (y - rect.height / 2) / 20;
                    const rotateY = (rect.width / 2 - x) / 20;
                    e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    const glareX = (x / rect.width) * 100;
                    const glareY = (y / rect.height) * 100;
                    const glareElement =
                      e.currentTarget.querySelector(".glare-effect");
                    if (glareElement) {
                      glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
                  }}
                  style={{
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <img
                    src="https://i.pinimg.com/736x/89/36/6c/89366c197a8eadf3e9638f306b1e70c3.jpg"
                    alt="Developer portrait"
                    className="w-200 h-150 object-cover object-top"
                  />
                  <div className="glare-effect absolute inset-0 pointer-events-none transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-8 right-8 flex items-center text-white">
                  <span className="mr-2">Hover</span>
                  <i className="fas fa-arrow-right text-[#9fff24]"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6 text-center">PROJECTS</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              A selection of my recent work showcasing my skills in web
              development, design, and problem-solving.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-Commerce Platform",
                  category: "Full Stack Development",
                  image:
                    "https://readdy.ai/api/search-image?query=Modern%20e-commerce%20website%20interface%20shown%20on%20a%20laptop%20screen%20with%20dark%20mode%20UI%2C%20showcasing%20product%20grid%20layout%20with%20minimalist%20design%2C%20sleek%20navigation%20and%20shopping%20cart%20functionality%2C%20professional%20web%20development%20project&width=600&height=450&seq=proj1&orientation=landscape",
                },
                {
                  title: "Portfolio Website",
                  category: "Frontend Development",
                  image:
                    "https://readdy.ai/api/search-image?query=Creative%20portfolio%20website%20design%20with%20dark%20theme%2C%20grid%20layout%20of%20project%20thumbnails%2C%20minimalist%20navigation%20and%20sleek%20typography%2C%20shown%20on%20desktop%20screen%20with%20subtle%20UI%20animations%2C%20professional%20web%20design%20project&width=600&height=450&seq=proj2&orientation=landscape",
                },
                {
                  title: "Mobile Banking App",
                  category: "UI/UX Design",
                  image:
                    "https://readdy.ai/api/search-image?query=Banking%20mobile%20application%20interface%20with%20dark%20mode%20design%2C%20showing%20financial%20dashboard%20with%20graphs%20and%20transaction%20history%2C%20clean%20typography%20and%20intuitive%20navigation%2C%20professional%20fintech%20UI%20design%20project&width=600&height=450&seq=proj3&orientation=landscape",
                },
                {
                  title: "Travel Blog",
                  category: "WordPress Development",
                  image:
                    "https://readdy.ai/api/search-image?query=Travel%20blog%20website%20with%20dark%20aesthetic%20showing%20photo%20grid%20layout%2C%20featured%20articles%20with%20large%20imagery%2C%20clean%20typography%20and%20minimal%20navigation%2C%20professional%20web%20development%20project&width=600&height=450&seq=proj4&orientation=landscape",
                },
                {
                  title: "Fitness Tracker",
                  category: "React Native App",
                  image:
                    "https://readdy.ai/api/search-image?query=Fitness%20tracking%20application%20interface%20with%20dark%20UI%20showing%20workout%20statistics%2C%20progress%20charts%20and%20activity%20logs%2C%20clean%20minimal%20design%20with%20accent%20colors%2C%20professional%20mobile%20app%20development%20project&width=600&height=450&seq=proj5&orientation=landscape",
                },
                {
                  title: "Restaurant Website",
                  category: "Web Design",
                  image:
                    "https://readdy.ai/api/search-image?query=Restaurant%20website%20with%20dark%20elegant%20theme%2C%20featuring%20food%20photography%2C%20menu%20layout%20and%20reservation%20system%2C%20sophisticated%20typography%20and%20minimal%20navigation%2C%20professional%20web%20design%20project&width=600&height=450&seq=proj6&orientation=landscape",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg transform transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-sm text-gray-400 block mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <button className="px-8 py-3 border border-white text-white text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-all !rounded-button whitespace-nowrap cursor-pointer">
                View All Projects
              </button>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        {/* Tech Stack Infinite Scroll */}
        <div className="py-12 bg-black overflow-hidden">
          <div className="relative">
            <div className="infinite-scroll">
              {Array(2)
                .fill([
                  "React",
                  "Vue",
                  "Angular",
                  "Node.js",
                  "TypeScript",
                  "MongoDB",
                  "AWS",
                  "Docker",
                ])
                .flat()
                .map((tech, index) => (
                  <div key={index} className="flex items-center space-x-8 px-4">
                    <span className="text-2xl text-gray-400 whitespace-nowrap">
                      {tech}
                    </span>
                  </div>
                ))}
            </div>
            <div className="mt-8">
              <div className="infinite-scroll-reverse">
                {Array(2)
                  .fill([
                    "Python",
                    "Java",
                    "GraphQL",
                    "Firebase",
                    "Redux",
                    "Webpack",
                    "Git",
                    "Figma",
                  ])
                  .flat()
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-8 px-4"
                    >
                      <span className="text-2xl text-gray-400 whitespace-nowrap">
                        {tech}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <section id="skills" className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6 text-center">SKILLS</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              My technical toolkit and expertise that I bring to every project.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend Development",
                  icon: "fa-code",
                  skills: [
                    "HTML5/CSS3",
                    "JavaScript (ES6+)",
                    "React.js",
                    "Vue.js",
                    "TypeScript",
                    "Responsive Design",
                  ],
                },
                {
                  title: "Backend Development",
                  icon: "fa-server",
                  skills: [
                    "Node.js",
                    "Express",
                    "RESTful APIs",
                    "GraphQL",
                    "MongoDB",
                    "Firebase",
                  ],
                },
                {
                  title: "UI/UX Design",
                  icon: "fa-palette",
                  skills: [
                    "Figma",
                    "Adobe XD",
                    "Wireframing",
                    "Prototyping",
                    "User Research",
                    "Accessibility",
                  ],
                },
                {
                  title: "Tools & Methods",
                  icon: "fa-toolbox",
                  skills: [
                    "Git/GitHub",
                    "Webpack",
                    "Jest",
                    "CI/CD",
                    "Agile/Scrum",
                    "Performance Optimization",
                  ],
                },
                {
                  title: "CMS & E-Commerce",
                  icon: "fa-shopping-cart",
                  skills: [
                    "WordPress",
                    "Shopify",
                    "WooCommerce",
                    "Contentful",
                    "Strapi",
                    "Headless CMS",
                  ],
                },
                {
                  title: "Mobile Development",
                  icon: "fa-mobile-alt",
                  skills: [
                    "React Native",
                    "Progressive Web Apps",
                    "App Performance",
                    "Cross-platform Development",
                  ],
                },
              ].map((skillGroup, index) => (
                <div
                  key={index}
                  className="skill-card bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <i className={`fas ${skillGroup.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {skillGroup.title}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <i className="fas fa-check text-xs mr-2"></i>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-24 bg-black">
          <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <p className="text-gray-400 text-sm tracking-wider uppercase mb-6">
              Reach out anytime
            </p>
            <h2 className="text-6xl font-serif mb-8">
              Let's Stay <span className="text-blue-500">Connected</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
              Have questions or want to collaborate? I'm always open to new
              projects or even a casual conversation—feel free to get in touch!
            </p>
            <button className="group px-8 py-4 bg-transparent border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 mb-16 !rounded-button whitespace-nowrap cursor-pointer">
              <span className="flex items-center">
                Contact Me
                <i className="fas fa-arrow-up-right-from-square ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              </span>
            </button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-semibold tracking-wider mb-2">
                YASHASVI TIWARI
              </div>
              <p className="text-gray-400">Creative Web Developer</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                {[
                  "fa-github",
                  "fa-linkedin-in",
                  "fa-twitter",
                  "fa-dribbble",
                ].map((icon, index) => (
                  <a
                    key={index}
                    href="https://#"
                    data-readdy="true"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <i className={`fab ${icon}`}></i>
                  </a>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Yashasvi Tiwari. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300 hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer ${
          window.scrollY > 300 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      {/* Custom Cursor */}
      <div
        className="custom-cursor hidden md:block fixed w-8 h-8 pointer-events-none z-50 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: loading ? 0 : 1,
        }}
      ></div>
      {/* Global styles */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes neonGridMove {
          from {
            transform: perspective(500px) rotateX(45deg) translateY(0);
          }
          to {
            transform: perspective(500px) rotateX(45deg) translateY(-100px);
          }
        }
        /* Project card hover cursor */
        .project-card-hover {
          position: fixed;
          width: 80px;
          height: 80px;
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: difference;
        }
        /* Infinite tech stack scroller */
        .infinite-scroll {
          display: flex;
          animation: scroll 20s linear infinite;
          gap: 2rem;
        }
        .infinite-scroll-reverse {
          display: flex;
          animation: scroll-reverse 20s linear infinite;
          gap: 2rem;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        /* Skills neon glow */
        .skill-card {
          position: relative;
          overflow: hidden;
        }
        .skill-card::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff0099, #00ff99);
          z-index: -1;
          animation: neonBorder 3s linear infinite;
          border-radius: lg;
        }
        @keyframes neonBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        /* Hide default cursor on desktop */
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
          a,
          button,
          [role="button"],
          .cursor-pointer {
            cursor: none;
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
};
export default App;

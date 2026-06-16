import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  Terminal,
  Send,
  Database,
  Sparkles,
  Globe,
  Cpu
} from 'lucide-react';
import { Github, Linkedin } from './components/Icons';
import ProjectCard from './components/ProjectCard';

// Asset Imports
import ospatImg from './assets/ospat.png';
import axioraImg from './assets/axiora.png';
import visionzaImg from './assets/visionza.png';
import profileImg from './assets/profile.jpg';

// Custom Typewriter Hook
const useTypewriter = (words, typingSpeed = 80, deletingSpeed = 40, delay = 1500) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  return currentText;
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Competitive Programmer',
    'Research Intern'
  ];
  const typedRole = useTypewriter(roles);

  // Handle Navbar Scroll Background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section on scroll
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  // Skill Data
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={18} />,
      skills: ['Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Go']
    },
    {
      title: 'Frameworks',
      icon: <Cpu size={18} />,
      skills: ['Next.js', 'React.js', 'Django', 'Express.js', 'FastAPI', 'Tailwind CSS']
    },
    {
      title: 'Tools & Databases',
      icon: <Database size={18} />,
      skills: ['Git', 'Docker', 'PostgreSQL', 'Neon DB', 'Appwrite', 'Prisma', 'Drizzle ORM', 'MongoDB']
    },
    {
      title: 'Core Concepts',
      icon: <Terminal size={18} />,
      skills: ['DSA', 'OOP', 'Computer Networks', 'DBMS', 'System Design', 'REST APIs']
    }
  ];

  // Filter skills based on chosen category
  const filteredSkillCategories = selectedSkillCategory === 'All'
    ? skillCategories
    : skillCategories.filter(cat => cat.title === selectedSkillCategory);

  // Projects Data
  const projects = [
    {
      title: 'OSPAT - Real-time Tech Interview Platform',
      description: 'A real-time remote technical interview environment. Supporting screen sharing and low-latency (<200ms) streams. Outfitted with an isolated code validation workspace yielding test results in <1.5 seconds, and asynchronous background queues for automated workflows.',
      tags: ['Next.js', 'Stream Video/Chat', 'Node.js', 'Inngest', 'TanStack Query'],
      img: ospatImg,
      github: 'https://github.com/Sumit-Tiwari830/OSPAT-interview',
      demo: 'https://ospat-interview-hhtow.sevalla.app/'
    },
    {
      title: 'Axiora - School Management & Virtual Classroom',
      description: 'An all-in-one school management suite. Boasts WebRTC P2P conferencing (99% success rate), automated attendee indicators, and secure Razorpay payment portals. Features a Llama 3 AI chatbot assistant resolving questions in <2 seconds.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'WebRTC', 'Groq SDK'],
      img: axioraImg,
      github: 'https://github.com/Sumit-Tiwari830/Axiora',
      demo: 'https://axiora-psi.vercel.app'
    },
    {
      title: 'Visionza - AI Image Restyling SaaS',
      description: 'An editing software-as-a-service application. Designed with Next.js 15, Neon Postgres, and Drizzle ORM to ensure fully type-safe queries and 25% faster DB latency. Implements OpenAI style transfer APIs and automated error monitoring tools.',
      tags: ['Next.js 15', 'Neon DB', 'Clerk Auth', 'OpenAI API', 'Drizzle ORM', 'Sentry'],
      img: visionzaImg,
      github: 'https://github.com/Sumit-Tiwari830/vidionza',
      demo: 'https://visionza.vercel.app/'
    }
  ];

  return (
    <div>
      {/* Background Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Sticky Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a onClick={() => handleNavClick('hero')} className="logo">
            Sumit.dev<span className="logo-dot"></span>
          </a>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'].map((section) => (
              <li key={section}>
                <a
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={() => handleNavClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="app-container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Research Intern @ NIT Silchar
            </div>
            <h1 className="hero-title">
              Hi, I'm <br />
              <span className="gradient-text">Sumit Tiwari</span>
            </h1>
            <div className="hero-role-wrapper">
              I am a <span className="hero-role">{typedRole}</span>
            </div>
            <p className="hero-desc">
              Computer Science student at NIT Silchar. Passionate about engineering high-performance microservices, low-latency communication, and building scalable full-stack web applications.
            </p>
            <div className="hero-actions">
              <a onClick={() => handleNavClick('projects')} className="btn btn-primary">
                View Projects
              </a>
              <a onClick={() => handleNavClick('contact')} className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/Sumit-Tiwari830" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/sumit-tiwari-26662128b/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:kiransumit2232@gmail.com" className="social-link" title="Email">
                <Mail size={20} />
              </a>
              <a href="https://leetcode.com/u/Sumit_2312190/" target="_blank" rel="noopener noreferrer" className="social-link" title="LeetCode">
                <span style={{ fontWeight: '800', fontSize: '0.8rem' }}>LC</span>
              </a>
              <a href="https://codeforces.com/profile/Sumit_Tiwari" target="_blank" rel="noopener noreferrer" className="social-link" title="Codeforces">
                <span style={{ fontWeight: '800', fontSize: '0.8rem' }}>CF</span>
              </a>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            <div className="hero-image-frame">
              <img src={profileImg} alt="Sumit Tiwari" className="hero-profile-img" />
            </div>
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section id="about" className="app-container">
        <div className="section-header">
          <h2 className="section-title">Education & Background</h2>
          <p className="section-subtitle">
            My educational timeline and academic benchmarks. I am currently pursuing computer science at one of India's premier institutes.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">B.Tech in Computer Science & Engineering</h3>
                  <span className="timeline-institution">National Institute of Technology, Silchar</span>
                </div>
                <span className="timeline-date">2023 -- 2027</span>
              </div>
              <p className="timeline-body">
                Acquiring deep foundations in Algorithms, Computer Networks, DBMS, System Design, and Microservice Architectures. Consistently ranked in the top 5% of the Computer Science department.
              </p>
              <div>
                <span className="timeline-gpa">CGPA: 9.31 / 10.0 (up to 6th Sem)</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">Class 12th (Senior Secondary)</h3>
                  <span className="timeline-institution">Saraswati Shishu Mandir, Mangawan (MP Board)</span>
                </div>
                <span className="timeline-date">2022</span>
              </div>
              <p className="timeline-body">
                Focused on Mathematics, Physics, Chemistry, and Computer Science. Secured top honors as a district topper.
              </p>
              <div>
                <span className="timeline-gpa">Result: 95.6% (District Topper - Top 1%)</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">Class 10th (Secondary Education)</h3>
                  <span className="timeline-institution">Saraswati Shishu Mandir, Mangawan (MP Board)</span>
                </div>
                <span className="timeline-date">2020</span>
              </div>
              <p className="timeline-body">
                General sciences and basic mathematics education. Excellent academic performance across subjects.
              </p>
              <div>
                <span className="timeline-gpa">Result: 96.75%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="app-container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            A comprehensive overview of tools, frameworks, and programming languages I use to engineer robust backend services and web applications.
          </p>
        </div>

        <div className="skills-filter">
          {['All', 'Languages', 'Frameworks', 'Tools & Databases', 'Core Concepts'].map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedSkillCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedSkillCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkillCategories.map((category, idx) => (
            <div key={idx} className="glass-card skill-category-card">
              <h3 className="skill-category-title">
                {category.icon}
                {category.title}
              </h3>
              <div className="skill-list">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="app-container">
        <div className="section-header">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Applying theoretical computer science foundations to building production-ready architectures and microservices.
          </p>
        </div>

        <div className="exp-wrapper">
          <div className="glass-card">
            <div className="exp-header">
              <div className="exp-role-info">
                <h3 className="exp-role">Research Intern</h3>
                <span className="exp-company">
                  <GraduationCap size={16} /> S. N. Bose Summer Internship Program, NIT Silchar
                </span>
              </div>
              <div className="exp-meta">
                <span className="exp-date">May 2026 -- Present</span>
                <span className="exp-location">Silchar, India</span>
              </div>
            </div>
            <ul className="exp-bullets">
              <li>
                <strong>Architected</strong> a Go REST API for biometric verification, executing secure User DB pipelines and high-accuracy SourceAFIS fingerprint matching.
              </li>
              <li>
                <strong>Designed</strong> an asynchronous cross-language microservice pipeline to transmit Base64 image data payloads from the Go backend service to a Python ML API for deep learning preprocessing.
              </li>
              <li>
                <strong>Conducted</strong> research and deployment models under the guidance of <strong>Dr. Debbrota Paul Chowdhury</strong> to improve biometric security pipelines.
              </li>
            </ul>
            <div className="exp-tools-title">Technologies Used:</div>
            <div className="exp-tools">
              {['Go', 'Python', 'FastAPI', 'PyTorch', 'SSD300', 'SourceAFIS', 'Docker', 'REST APIs', 'MySQL'].map((tool, idx) => (
                <span key={idx} className="tool-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="app-container">
        <div className="section-header">
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            A showcase of web applications and products I have developed, focused on low-latency, real-time interactivity, and modern UI/UX design.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              description={project.description}
              tags={project.tags}
              img={project.img}
              github={project.github}
              demo={project.demo}
            />
          ))}
        </div>
      </section>

      {/* Achievements / Competitive Programming */}
      <section id="achievements" className="app-container">
        <div className="section-header">
          <h2 className="section-title">Achievements & Competitive Programming</h2>
          <p className="section-subtitle">
            I enjoy solving algorithmic challenges and participating in competitive programming contests. Here are some of my statistics and benchmarks.
          </p>
        </div>

        <div className="achievements-wrapper">
          <div className="cp-platforms">
            {/* LeetCode Card */}
            <div className="glass-card cp-card">
              <div className="cp-info">
                <h3 className="cp-name">LeetCode</h3>
                <a href="https://leetcode.com/u/Sumit_2312190/" target="_blank" rel="noopener noreferrer" className="cp-user">
                  @Sumit_2312190
                </a>
                <div className="cp-stat-wrapper">
                  <div className="cp-stat">
                    <span className="cp-stat-val">600+</span>
                    <span className="cp-stat-lbl">Problems Solved</span>
                  </div>
                  <div className="cp-stat">
                    <span className="cp-stat-val">1912</span>
                    <span className="cp-stat-lbl">Max Rating</span>
                  </div>
                </div>
              </div>
              <div className="cp-badge-gauge">
                <svg className="gauge-svg">
                  <circle className="gauge-bg" cx="55" cy="55" r="45"></circle>
                  <circle
                    className="gauge-fill leetcode"
                    cx="55"
                    cy="55"
                    r="45"
                    strokeDasharray={283}
                    strokeDashoffset={283 - (283 * 1912) / 2400}
                  ></circle>
                </svg>
                <div className="gauge-label">
                  <span className="gauge-rating">1912</span>
                  <span className="gauge-title leetcode">Knight</span>
                </div>
              </div>
            </div>

            {/* Codeforces Card */}
            <div className="glass-card cp-card">
              <div className="cp-info">
                <h3 className="cp-name">Codeforces</h3>
                <a href="https://codeforces.com/profile/Sumit_Tiwari" target="_blank" rel="noopener noreferrer" className="cp-user">
                  @Sumit_Tiwari
                </a>
                <div className="cp-stat-wrapper">
                  <div className="cp-stat">
                    <span className="cp-stat-val">400+</span>
                    <span className="cp-stat-lbl">Problems Solved</span>
                  </div>
                  <div className="cp-stat">
                    <span className="cp-stat-val">1294</span>
                    <span className="cp-stat-lbl">Max Rating</span>
                  </div>
                </div>
              </div>
              <div className="cp-badge-gauge">
                <svg className="gauge-svg">
                  <circle className="gauge-bg" cx="55" cy="55" r="45"></circle>
                  <circle
                    className="gauge-fill codeforces"
                    cx="55"
                    cy="55"
                    r="45"
                    strokeDasharray={283}
                    strokeDashoffset={283 - (283 * 1294) / 1800}
                  ></circle>
                </svg>
                <div className="gauge-label">
                  <span className="gauge-rating">1294</span>
                  <span className="gauge-title codeforces">Pupil</span>
                </div>
              </div>
            </div>
          </div>

          <div className="achieve-list">
            <div className="glass-card achieve-item">
              <div className="achieve-icon-box yellow">
                <Award size={22} />
              </div>
              <div className="achieve-text">
                <strong>Hackathon Finalist</strong> at the NITS Coding Club Annual Hackathon (2024).
              </div>
            </div>

            <div className="glass-card achieve-item">
              <div className="achieve-icon-box">
                <Sparkles size={22} />
              </div>
              <div className="achieve-text">
                <strong>District Topper</strong> (Top 1%) in MP Board Class 12th Examinations (2022).
              </div>
            </div>

            <div className="glass-card achieve-item">
              <div className="achieve-icon-box">
                <Globe size={22} />
              </div>
              <div className="achieve-text">
                <strong>Department Rank</strong>: Positioned in the Top 5% of the CSE department at NIT Silchar.
              </div>
            </div>

            <div className="glass-card achieve-item">
              <div className="achieve-icon-box">
                <Briefcase size={22} />
              </div>
              <div className="achieve-text">
                <strong>Senior Member</strong> of the Hindi Cell at NIT Silchar. Managed logistics and regional promotion for 3+ cultural festivals catering to 500+ attendees.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="app-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have an opportunity, want to collaborate on a research pipeline, or just discuss full-stack optimization? Reach out below!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <Mail size={22} />
              </div>
              <div className="contact-card-details">
                <span className="contact-card-lbl">Email</span>
                <a href="mailto:kiransumit2232@gmail.com" className="contact-card-val">
                  kiransumit2232@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <Phone size={22} />
              </div>
              <div className="contact-card-details">
                <span className="contact-card-lbl">Phone</span>
                <a href="tel:+919589045802" className="contact-card-val">
                  +91 9589045802
                </a>
              </div>
            </div>

            <div className="glass-card contact-card">
              <div className="contact-card-icon">
                <MapPin size={22} />
              </div>
              <div className="contact-card-details">
                <span className="contact-card-lbl">Location</span>
                <span className="contact-card-val">Silchar, Assam, India</span>
              </div>
            </div>
          </div>

          <div className="glass-card">
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifycontent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <Send size={24} style={{ transform: 'translateX(2px)' }} />
                </div>
                <h3 className="timeline-title" style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out, Sumit will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    className="form-input"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="app-container footer-container">
          <a onClick={() => handleNavClick('hero')} className="footer-logo">
            Sumit.dev<span className="logo-dot"></span>
          </a>
          <div className="footer-socials">
            <a href="https://github.com/Sumit-Tiwari830" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sumit-tiwari-26662128b/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Linkedin size={20} />
            </a>
            <a href="mailto:kiransumit2232@gmail.com" className="footer-social-link">
              <Mail size={20} />
            </a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Sumit Tiwari. Built with React & Vite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

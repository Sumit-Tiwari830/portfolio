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
      if (window.scrollY > 30) {
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
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      let formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'YOUR_FORMSPREE_ID';
      
      // Auto-extract the ID if the user pasted the entire URL
      if (formspreeId.includes('formspree.io/f/')) {
        formspreeId = formspreeId.split('formspree.io/f/')[1].trim();
      }

      if (formspreeId === 'YOUR_FORMSPREE_ID' || !formspreeId) {
        alert('Formspree is not configured yet. Please update VITE_FORMSPREE_ID in your .env file!');
        return;
      }

      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message
          })
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setFormState({ name: '', email: '', message: '' });
          }, 5000);
        } else {
          alert('Failed to send message. Please check your setup and try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  // Skill Data
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={16} className="text-accent-purple" />,
      skills: ['Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Go']
    },
    {
      title: 'Frameworks',
      icon: <Cpu size={16} className="text-accent-blue" />,
      skills: ['Next.js', 'React.js', 'Django', 'Express.js', 'FastAPI', 'Tailwind CSS']
    },
    {
      title: 'Tools & Databases',
      icon: <Database size={16} className="text-accent-cyan" />,
      skills: ['Git', 'Docker', 'PostgreSQL', 'Neon DB', 'Appwrite', 'Prisma', 'Drizzle ORM', 'MongoDB']
    },
    {
      title: 'Core Concepts',
      icon: <Terminal size={16} className="text-zinc-400" />,
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
      github: 'https://github.com/Sumit-Tiwari830/OSPAT-interview',
      demo: 'https://ospat-interview-hhtow.sevalla.app/'
    },
    {
      title: 'Axiora - School Management & Virtual Classroom',
      description: 'An all-in-one school management suite. Boasts WebRTC P2P conferencing (99% success rate), automated attendee indicators, and secure Razorpay payment portals. Features a Llama 3 AI chatbot assistant resolving questions in <2 seconds.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'WebRTC', 'Groq SDK'],
      github: 'https://github.com/Sumit-Tiwari830/Axiora',
      demo: 'https://axiora-psi.vercel.app'
    },
    {
      title: 'Visionza - AI Image Restyling SaaS',
      description: 'An editing software-as-a-service application. Designed with Next.js 15, Neon Postgres, and Drizzle ORM to ensure fully type-safe queries and 25% faster DB latency. Implements OpenAI style transfer APIs and automated error monitoring tools.',
      tags: ['Next.js 15', 'Neon DB', 'Clerk Auth', 'OpenAI API', 'Drizzle ORM', 'Sentry'],
      github: 'https://github.com/Sumit-Tiwari830/vidionza',
      demo: 'https://visionza.vercel.app/'
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-zinc-100 font-body relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute blob w-[500px] h-[500px] bg-accent-purple/10 -top-[10%] -left-[10%] animation-delay-0"></div>
        <div className="absolute blob w-[400px] h-[400px] bg-accent-blue/10 bottom-[10%] -right-[5%] animation-delay-5000"></div>
        <div className="absolute blob w-[300px] h-[300px] bg-accent-cyan/10 top-[40%] left-[60%] animation-delay-10000"></div>
      </div>

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 h-16 border-b transition-all duration-300 z-50 flex items-center ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-zinc-900/80 shadow-lg' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center">
          <a onClick={() => handleNavClick('hero')} className="font-heading text-lg font-extrabold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent flex items-center gap-1.5 cursor-pointer">
            Sumit.dev<span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--color-accent-cyan)]"></span>
          </a>

          <ul className={`hidden md:flex gap-8 list-none`}>
            {['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'].map((section) => (
              <li key={section}>
                <a
                  className={`text-sm font-medium transition-all duration-200 cursor-pointer relative py-1 hover:text-zinc-100 ${activeSection === section ? 'text-zinc-100 after:absolute after:bottom-0 after:left-0 after:w-full after:height-[2px] after:bg-gradient-to-r after:from-accent-purple after:to-accent-cyan after:rounded-md' : 'text-zinc-400'}`}
                  onClick={() => handleNavClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-zinc-100 hover:text-accent-purple transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown menu */}
        <div className={`md:hidden fixed top-16 left-0 right-0 bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-900 p-6 flex flex-col gap-4 text-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          {['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'].map((section) => (
            <a
              key={section}
              className={`text-base font-medium py-1 transition-colors duration-200 ${activeSection === section ? 'text-accent-purple font-semibold' : 'text-zinc-400'}`}
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="max-w-5xl mx-auto px-6 pt-32 pb-20 flex items-center justify-center min-h-[85vh]">
        <div className="flex flex-col items-center text-center max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent">Sumit Tiwari</span>
          </h1>
          <div className="font-heading text-lg sm:text-xl md:text-2xl font-medium text-zinc-400 mb-6 flex items-center gap-1.5 h-8">
            I am a <span className="text-zinc-100 typewriter-cursor">{typedRole}</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
            Computer Science & Engineering student at NIT Silchar. Passionate about engineering high-performance microservices, low-latency communication networks, and building robust full-stack web applications.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button onClick={() => handleNavClick('projects')} className="px-5 py-2.5 bg-gradient-to-r from-accent-purple to-accent-blue hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              View Projects
            </button>
            <button onClick={() => handleNavClick('contact')} className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 font-semibold text-sm border border-zinc-800 rounded-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              Get In Touch
            </button>
          </div>
          <div className="flex gap-3">
            <a href="https://github.com/Sumit-Tiwari830" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300" title="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/sumit-tiwari-26662128b/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:kiransumit2232@gmail.com" className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300" title="Email">
              <Mail size={18} />
            </a>
            <a href="https://leetcode.com/u/Sumit_2312190/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300 font-extrabold text-[11px]" title="LeetCode">
              LC
            </a>
            <a href="https://codeforces.com/profile/Sumit_Tiwari" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300 font-extrabold text-[11px]" title="Codeforces">
              CF
            </a>
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">Education & Background</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            My educational timeline and academic benchmarks. I am currently pursuing computer science at one of India's premier institutes.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 max-w-3xl mx-auto pl-8 border-l-2 border-zinc-900/60">
          {/* Timeline Item 1 */}
          <div className="relative group">
            <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-bg-primary border-4 border-accent-purple group-hover:border-accent-cyan shadow-[0_0_8px_var(--color-accent-purple)] transition-colors duration-300"></div>
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                <div>
                  <h3 className="font-heading text-lg font-bold text-zinc-100">B.Tech in Computer Science & Engineering</h3>
                  <span className="text-sm font-semibold text-accent-blue">National Institute of Technology, Silchar</span>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800/40 rounded-full">2023 -- 2027</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Acquiring deep foundations in Algorithms, Computer Networks, DBMS, System Design, and Microservice Architectures. Consistently ranked in the top 5% of the Computer Science department.
              </p>
              <span className="inline-block text-xs font-bold text-accent-green bg-accent-green/10 border border-accent-green/20 px-3 py-1 rounded-md">CGPA: 9.31 / 10.0 (up to 6th Sem)</span>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative group">
            <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-bg-primary border-4 border-accent-purple group-hover:border-accent-cyan shadow-[0_0_8px_var(--color-accent-purple)] transition-colors duration-300"></div>
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                <div>
                  <h3 className="font-heading text-lg font-bold text-zinc-100">Class 12th (Senior Secondary)</h3>
                  <span className="text-sm font-semibold text-accent-blue">Saraswati Shishu Mandir, Mangawan (MP Board)</span>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800/40 rounded-full">2022</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Focused on Mathematics, Physics, Chemistry, and Computer Science. Secured top honors as a district topper.
              </p>
              <span className="inline-block text-xs font-bold text-accent-green bg-accent-green/10 border border-accent-green/20 px-3 py-1 rounded-md">Result: 95.6% (District Topper - Top 1%)</span>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="relative group">
            <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-bg-primary border-4 border-accent-purple group-hover:border-accent-cyan shadow-[0_0_8px_var(--color-accent-purple)] transition-colors duration-300"></div>
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                <div>
                  <h3 className="font-heading text-lg font-bold text-zinc-100">Class 10th (Secondary Education)</h3>
                  <span className="text-sm font-semibold text-accent-blue">Saraswati Shishu Mandir, Mangawan (MP Board)</span>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800/40 rounded-full">2020</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                General sciences and basic mathematics education. Excellent academic performance across subjects.
              </p>
              <span className="inline-block text-xs font-bold text-accent-green bg-accent-green/10 border border-accent-green/20 px-3 py-1 rounded-md">Result: 96.75%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">Technical Expertise</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A comprehensive overview of tools, frameworks, and programming languages I use to engineer robust backend services and web applications.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All', 'Languages', 'Frameworks', 'Tools & Databases', 'Core Concepts'].map((category) => (
            <button
              key={category}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${selectedSkillCategory === category ? 'bg-gradient-to-r from-accent-purple to-accent-blue text-white border-transparent shadow-md shadow-purple-500/10' : 'bg-bg-card border-border-card text-zinc-400 hover:text-zinc-200'}`}
              onClick={() => setSelectedSkillCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkillCategories.map((category, idx) => (
            <div key={idx} className="bg-bg-card border border-border-card hover:border-border-hover rounded-xl p-5 transition-colors duration-300">
              <h3 className="font-heading text-sm font-bold text-zinc-100 border-b border-zinc-900 pb-3 mb-4 flex items-center gap-2">
                {category.icon}
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="text-xs px-2.5 py-1 bg-zinc-950/40 text-zinc-400 border border-zinc-800/40 rounded-md hover:text-zinc-200 hover:border-zinc-700/60 transition-colors duration-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">Professional Experience</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Applying theoretical computer science foundations to building production-ready architectures and microservices.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-bg-card border border-border-card hover:border-border-hover p-6 sm:p-8 rounded-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-zinc-100 mb-1">Research Intern</h3>
              <span className="text-sm font-semibold text-accent-purple flex items-center gap-1.5">
                <Briefcase size={14} /> S. N. Bose Summer Internship Program, NIT Silchar
              </span>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-xs font-semibold px-2.5 py-1 bg-accent-purple/10 text-purple-300 border border-accent-purple/20 rounded-full">May 2026 -- Present</span>
              <span className="text-xs text-zinc-500">Silchar, India</span>
            </div>
          </div>
          <ul className="list-none flex flex-col gap-3.5 mb-6 text-sm text-zinc-400 leading-relaxed">
            <li className="relative pl-5 before:content-['→'] before:absolute before:left-0 before:text-accent-cyan before:font-bold">
              <strong>Architected</strong> a Go REST API for biometric verification, executing secure User DB pipelines and high-accuracy SourceAFIS fingerprint matching.
            </li>
            <li className="relative pl-5 before:content-['→'] before:absolute before:left-0 before:text-accent-cyan before:font-bold">
              <strong>Designed</strong> an asynchronous cross-language microservice pipeline to transmit Base64 image data payloads from the Go backend service to a Python ML API for deep learning preprocessing.
            </li>
            <li className="relative pl-5 before:content-['→'] before:absolute before:left-0 before:text-accent-cyan before:font-bold">
              <strong>Conducted</strong> research and deployment models under the guidance of <strong>Dr. Debbrota Paul Chowdhury</strong> to improve biometric security pipelines.
            </li>
          </ul>
          <div className="border-t border-zinc-900/80 pt-4">
            <span className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">Technologies Used</span>
            <div className="flex flex-wrap gap-1.5">
              {['Go', 'Python', 'FastAPI', 'PyTorch', 'SSD300', 'SourceAFIS', 'Docker', 'REST APIs', 'MySQL'].map((tool, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 bg-zinc-900/60 text-zinc-400 border border-zinc-800/40 rounded-md">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">Selected Projects</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A showcase of web applications and products I have developed, focused on low-latency, real-time interactivity, and modern UI/UX design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              description={project.description}
              tags={project.tags}
              github={project.github}
              demo={project.demo}
            />
          ))}
        </div>
      </section>

      {/* Achievements / Competitive Programming */}
      <section id="achievements" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">Achievements & CP</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            I enjoy solving algorithmic challenges and participating in competitive programming contests. Here are some of my statistics and benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col gap-4">
            {/* LeetCode Card */}
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-6 rounded-xl flex items-center justify-between transition-colors duration-300">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-bold text-zinc-100">LeetCode</h3>
                <a href="https://leetcode.com/u/Sumit_2312190/" target="_blank" rel="noopener noreferrer" className="text-xs text-accent-cyan hover:underline">
                  @Sumit_2312190
                </a>
                <div className="flex gap-6 mt-2">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-zinc-100">600+</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Solved</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-zinc-100">1912</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Max Rating</span>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center w-[90px] h-[90px]">
                <svg className="gauge-svg w-full h-full">
                  <circle className="gauge-bg" cx="45" cy="45" r="38"></circle>
                  <circle
                    className="gauge-fill"
                    cx="45"
                    cy="45"
                    r="38"
                    stroke="#8b5cf6"
                    strokeDasharray={239}
                    strokeDashoffset={239 - (239 * 1912) / 2400}
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-zinc-200">1912</span>
                  <span className="text-[9px] font-bold text-accent-purple uppercase tracking-wider">Knight</span>
                </div>
              </div>
            </div>

            {/* Codeforces Card */}
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-6 rounded-xl flex items-center justify-between transition-colors duration-300">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-bold text-zinc-100">Codeforces</h3>
                <a href="https://codeforces.com/profile/Sumit_Tiwari" target="_blank" rel="noopener noreferrer" className="text-xs text-accent-cyan hover:underline">
                  @Sumit_Tiwari
                </a>
                <div className="flex gap-6 mt-2">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-zinc-100">400+</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Solved</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-zinc-100">1294</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Max Rating</span>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center w-[90px] h-[90px]">
                <svg className="gauge-svg w-full h-full">
                  <circle className="gauge-bg" cx="45" cy="45" r="38"></circle>
                  <circle
                    className="gauge-fill"
                    cx="45"
                    cy="45"
                    r="38"
                    stroke="#3b82f6"
                    strokeDasharray={239}
                    strokeDashoffset={239 - (239 * 1294) / 1800}
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-zinc-200">1294</span>
                  <span className="text-[9px] font-bold text-accent-blue uppercase tracking-wider">Pupil</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-4 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/25 text-yellow-500">
                <Award size={20} />
              </div>
              <div className="text-sm text-zinc-400">
                <strong className="text-zinc-200">Hackathon Finalist</strong> at the NITS Coding Club Annual Hackathon (2024).
              </div>
            </div>

            <div className="bg-bg-card border border-border-card hover:border-border-hover p-4 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-green/10 border border-accent-green/25 text-accent-green">
                <Sparkles size={20} />
              </div>
              <div className="text-sm text-zinc-400">
                <strong className="text-zinc-200">District Topper</strong> (Top 1%) in MP Board Class 12th Examinations (2022).
              </div>
            </div>

            <div className="bg-bg-card border border-border-card hover:border-border-hover p-4 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-blue/10 border border-accent-blue/25 text-accent-blue">
                <Globe size={20} />
              </div>
              <div className="text-sm text-zinc-400">
                <strong className="text-zinc-200">Department Rank</strong>: Positioned in the Top 5% of the CSE department at NIT Silchar.
              </div>
            </div>

            <div className="bg-bg-card border border-border-card hover:border-border-hover p-4 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-purple/10 border border-accent-purple/25 text-accent-purple">
                <Briefcase size={20} />
              </div>
              <div className="text-sm text-zinc-400">
                <strong className="text-zinc-200">Senior Member</strong> of the Hindi Cell at NIT Silchar. Managed logistics and regional promotion for 3+ cultural festivals (500+ attendees).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">Get In Touch</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Have an opportunity, want to collaborate on a research pipeline, or just discuss full-stack optimization? Reach out below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-bg-card border border-border-card hover:border-border-hover p-5 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent-purple/10 border border-accent-purple/25 text-accent-purple">
                <Mail size={18} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Email</span>
                <a href="mailto:kiransumit2232@gmail.com" className="text-sm font-semibold text-zinc-200 hover:text-accent-cyan transition-colors duration-200">
                  kiransumit2232@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-bg-card border border-border-card hover:border-border-hover p-5 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent-purple/10 border border-accent-purple/25 text-accent-purple">
                <Phone size={18} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Phone</span>
                <a href="tel:+919589045802" className="text-sm font-semibold text-zinc-200 hover:text-accent-cyan transition-colors duration-200">
                  +91 9589045802
                </a>
              </div>
            </div>

            <div className="bg-bg-card border border-border-card hover:border-border-hover p-5 rounded-xl flex items-center gap-4 transition-colors duration-300">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent-purple/10 border border-accent-purple/25 text-accent-purple">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Location</span>
                <span className="text-sm font-semibold text-zinc-200">
                  Silchar, Assam, India
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-bg-card border border-border-card p-6 sm:p-8 rounded-xl">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-accent-green/10 text-accent-green flex items-center justify-center mx-auto mb-4 border border-accent-green/20">
                  <Send size={20} className="translate-x-0.5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-zinc-100 mb-1">Message Sent!</h3>
                <p className="text-sm text-zinc-400">Thank you for reaching out, Sumit will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-zinc-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="bg-zinc-950/40 border border-border-card focus:border-accent-purple/80 text-zinc-100 px-4 py-2 text-sm rounded-lg outline-none transition-all duration-200 focus:shadow-[0_0_8px_rgba(139,92,246,0.15)]"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-zinc-400">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="bg-zinc-950/40 border border-border-card focus:border-accent-purple/80 text-zinc-100 px-4 py-2 text-sm rounded-lg outline-none transition-all duration-200 focus:shadow-[0_0_8px_rgba(139,92,246,0.15)]"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-zinc-400">Message</label>
                  <textarea
                    id="message"
                    className="bg-zinc-950/40 border border-border-card focus:border-accent-purple/80 text-zinc-100 px-4 py-2 text-sm rounded-lg outline-none transition-all duration-200 focus:shadow-[0_0_8px_rgba(139,92,246,0.15)] resize-y min-h-[100px]"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="mt-2 py-3 bg-gradient-to-r from-accent-purple to-accent-blue hover:from-purple-600 hover:to-blue-600 text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2">
                  Send Message <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60 bg-zinc-950/80 py-8 text-center mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
          <a onClick={() => handleNavClick('hero')} className="font-heading text-lg font-extrabold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent flex items-center gap-1 cursor-pointer">
            Sumit.dev<span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--color-accent-cyan)]"></span>
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/Sumit-Tiwari830" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent-purple hover:-translate-y-0.5 transition-all duration-200">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/sumit-tiwari-26662128b/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent-purple hover:-translate-y-0.5 transition-all duration-200">
              <Linkedin size={18} />
            </a>
            <a href="mailto:kiransumit2232@gmail.com" className="text-zinc-500 hover:text-accent-purple hover:-translate-y-0.5 transition-all duration-200">
              <Mail size={18} />
            </a>
          </div>
          <div className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Sumit Tiwari. Built with React, Vite & Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

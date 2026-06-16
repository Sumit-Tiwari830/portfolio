import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';

const ProjectCard = ({ title, description, tags, img, github, demo }) => {
  return (
    <div className="glass-card project-card">
      <div className="project-img-wrapper">
        <img src={img} alt={title} className="project-img" loading="lazy" />
        <div className="project-img-overlay"></div>
      </div>
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <Github size={16} /> Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

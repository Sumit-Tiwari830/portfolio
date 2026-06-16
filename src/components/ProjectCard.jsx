import React from 'react';
import { ExternalLink, Folder, Terminal, Video, Sparkles } from 'lucide-react';
import { Github } from './Icons';

const ProjectCard = ({ title, description, tags, github, demo }) => {
  // Select icon based on project title
  const getProjectIcon = () => {
    const t = title.toLowerCase();
    if (t.includes('ospat') || t.includes('interview')) {
      return <Video className="text-accent-purple" size={20} />;
    }
    if (t.includes('axiora') || t.includes('classroom')) {
      return <Terminal className="text-accent-cyan" size={20} />;
    }
    if (t.includes('visionza') || t.includes('image')) {
      return <Sparkles className="text-accent-blue" size={20} />;
    }
    return <Folder className="text-zinc-400" size={20} />;
  };

  return (
    <div className="group relative flex flex-col justify-between h-full bg-bg-card border border-border-card hover:border-border-hover hover:bg-bg-card-hover rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)]">
      <div>
        {/* Browser Top Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
          </div>
          <div className="p-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800/40">
            {getProjectIcon()}
          </div>
        </div>

        <h3 className="font-heading text-lg font-bold text-zinc-100 group-hover:text-accent-purple transition-colors duration-300 mb-3">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-5">
          {description}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-2 py-0.5 bg-zinc-900/60 text-zinc-400 border border-zinc-800/50 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-zinc-900/60">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-accent-purple transition-colors duration-300"
            >
              <Github size={14} /> Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-accent-purple transition-colors duration-300"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

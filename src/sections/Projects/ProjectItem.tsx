import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../data/portfolioData';
import { ChevronRight, ExternalLink, GitFork } from 'lucide-react';
import './Projects.css';

interface ProjectItemProps {
  project: Project;
  onSelect: (project: Project, triggerEl?: HTMLElement) => void;
}

export function ProjectItem({ project, onSelect }: ProjectItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to dedicated project page as primary action
    navigate(`/projects/${project.slug}`);
  };

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(project, e.currentTarget);
  };

  return (
    <div
      className={`project-item ${isHovered ? 'is-hovered' : ''} ${project.featured ? 'is-featured' : ''}`}
      data-project-item
      data-cursor="VIEW"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      aria-label={`Open case study for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/projects/${project.slug}`);
        }
      }}
    >
      <div className="project-header">
        <span className="project-num font-mono">{project.index || project.number}</span>
        
        <div className="project-title-group">
          <div className="project-headline-row">
            <h3 className="project-title">
              <Link
                to={`/projects/${project.slug}`}
                className="project-link-heading"
                onClick={(e) => e.stopPropagation()}
              >
                {project.title}
              </Link>
            </h3>
            {project.collaborationType && (
              <span className="project-collab-badge font-mono">
                {project.collaborationType}
              </span>
            )}
          </div>
          <span className="project-category">{project.category || project.role}</span>
        </div>

        <div className="project-meta font-mono">
          <span className="project-year">{project.year}</span>
          <span className="project-arrow" aria-hidden="true">
            <ChevronRight size={20} />
          </span>
        </div>
      </div>

      <div className="project-body">
        <p className="project-summary body-regular">
          {project.shortDescription}
        </p>

        <div className="project-footer-row">
          <div className="project-tags-list">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="project-tag font-mono">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-card-actions font-mono">
            {/* Quick View Button for instant modal preview */}
            <button
              type="button"
              className="quick-view-btn font-mono"
              onClick={handleQuickView}
              title={`Quick preview ${project.title}`}
            >
              Quick View
            </button>

            {project.liveUrl && (
              <span className="card-action-indicator">
                Live <ExternalLink size={12} />
              </span>
            )}
            {project.repositoryUrl && (
              <span className="card-action-indicator">
                Code <GitFork size={12} />
              </span>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="card-read-more"
              onClick={(e) => e.stopPropagation()}
            >
              Case Study &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

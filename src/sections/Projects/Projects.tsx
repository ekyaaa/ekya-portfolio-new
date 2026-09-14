import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsap';
import { projectsData, Project } from '../../data/portfolioData';
import { ProjectItem } from './ProjectItem';
import { ProjectModal } from './components/ProjectModal';
import './Projects.css';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from('[data-projects-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="projects-section">
      <div className="container">
        <div className="section-label" data-projects-reveal>
          <span className="number">02</span> portfolio.
        </div>

        <div className="projects-header-group" data-projects-reveal>
          <h2 className="section-title">Selected Works</h2>
          <p className="body-regular header-subtitle">
            A curated collection of web applications, interactive dashboards, and design engineering projects.
          </p>
        </div>

        <div className="projects-list" data-projects-reveal>
          {projectsData.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onSelect={(p, el) => {
                setTriggerElement(el || null);
                setSelectedProject(p);
              }}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          totalProjects={projectsData.length}
          triggerElement={triggerElement}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

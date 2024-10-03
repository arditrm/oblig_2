import React from 'react';

interface Project {
  Id: number;
  Title: string;
  Description: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map((project) => (
          <article key={project.Id}>
            <h3>{project.Title}</h3>
            <p>{project.Description}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default ProjectList;

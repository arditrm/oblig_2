import React, { useState } from 'react';
import { Project } from '../App';

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'Id'>) => void; // Ommitting Id
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ Title: title, Description: description }); // Send data til App
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
        required
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;

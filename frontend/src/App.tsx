import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

export interface Project {
  Id: number;
  Title: string;
  Description: string;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const response = await fetch('http://localhost:6969/json'); // Henter data fra din backend som serverer data.json
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Debug: Sjekk om data blir hentet riktig
      setProjects(data.allprojects); // Oppdaterer state med prosjektene fra data.json
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProjectSubmit = async (newProject: Omit<Project, 'Id'>) => {
    try {
      await fetch('http://localhost:6969/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      fetchDataFromServer(); // Henter prosjektene på nytt etter at et nytt prosjekt er lagt til
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <main>
      <header>
        <h1>Nytt Prosjekt</h1>
      </header>
      <ProjectForm onSubmit={handleProjectSubmit} />
      <section className="ViewProjectHeader">
        <header>
          <h2>Prosjekter</h2>
        </header>
        <button className="ShowAllProjects" onClick={fetchDataFromServer}>
          Vis alle prosjekter
        </button>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
};

export default App;

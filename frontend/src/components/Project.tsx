import React from 'react';

interface ProjectProps {
    Title: string;          
    Description: string;    
}

const Project: React.FC<ProjectProps> = ({ Title, Description }) => {
    return (
        <article>
            <h3>{Title}</h3>               {}
            <p>{Description}</p>           {}
        </article>
    );
};

export default Project;

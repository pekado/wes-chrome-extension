import React, { useEffect, useRef, useState } from 'react';
import ProjectClient from '../../../clients/ProjectClient';

function Projects({ project, setProject, setStatus }) {
  const [projects, setProjects] = useState([]);
  const [isProject, setIsProject] = useState(false);
  const projectClient = new ProjectClient();
  useEffect(() => {
    setStatus({
      loading: true,
      error: false,
    });
    projectClient
      .getAllProjects()
      .then((data) => {
        setProjects(data.data);
      })
      .then(() => {
        setStatus({
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        setStatus({
          loading: false,
          error: true,
        });
      });
    // return () => (unmounted = true);
  }, []);

  const onSetProject = (project) => {
    setProject(project);
    setIsProject(true);
    console.log(project);
  };

  const backToProjects = () => {
    setIsProject(false);
    setProject({});
  };
  return (
    <div className="container">
      {!isProject ? (
        <>
          <h2>Projects</h2>
          {projects.map((project) => (
            <h3
              className="pointer"
              key={project.id}
              onClick={() => onSetProject(project)}
            >
              {project.alias}
            </h3>
          ))}
        </>
      ) : (
        <div className="source-table">
          <div className="detail-row black">
            <div className="column flex-05">
              <span> Alias: </span>
            </div>
            <div className="column ">
              <span>{project.alias}</span>
            </div>
          </div>
          <div className="detail-row black">
            <div className="column flex-05">
              <span>Created at: </span>
            </div>
            <div className="column">
              <span>{new Date(project.created_at).toDateString()}</span>
            </div>
          </div>
          <div className="detail-row black">
            <div className="column flex-05">
              <span>Updated at: </span>
            </div>
            <div className="column">
              <span>{new Date(project.updated_at).toDateString()}</span>
            </div>
          </div>
          <a className="block" onClick={backToProjects}>
            Change project
          </a>
          <a className="block" href="http://www.hellowes.com" target="_blank">
            Create project
          </a>
        </div>
      )}
    </div>
  );
}

export default Projects;

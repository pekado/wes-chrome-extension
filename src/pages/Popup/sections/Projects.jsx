import React, { useEffect, useRef, useState } from 'react';
import ProjectClient from '../../../clients/ProjectClient';

function Projects({ project, setProject, setStatus }) {
  const [projects, setProjects] = useState([]);
  const [isProject, setIsProject] = useState(false);
  const projectClient = new ProjectClient();
  let currentTab;
  useEffect(async () => {
    setStatus({
      loading: true,
      error: false,
    });
    projectClient
      .getAllProjects()
      .then(async (data) => {
        setProjects(data.data);
      })
      .then(async () => {
        await onFindProject();
        setStatus({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          loading: false,
          // error: true,
        });
      });
  }, []);

  useEffect(async () => {
    await getCurrentTab();
    let findproject = projects.filter((project) =>
      project.name.includes(currentTab)
    );
    if (findproject.length) {
      onSetProject(findproject[0]);
      setIsProject(true);
    }
  }, [projects]);

  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    currentTab = tab.url.substring(tab.url.lastIndexOf('/') + 1);
  }

  const onSetProject = (project) => {
    setProject(project);
    setIsProject(true);
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

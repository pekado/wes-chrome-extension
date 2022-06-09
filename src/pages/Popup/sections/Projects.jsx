import React, { useEffect, useRef, useState } from 'react';
import ProjectClient from '../../../clients/ProjectClient';
import info from '../../../assets/img/info.svg';

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
      .then((data) => {
        setProjects(data.data);
      })
      .then(() => {
        setStatus({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.error(err);
        setStatus({
          loading: false,
          // error: true,
        });
      });
  }, []);

  useEffect(async () => {
    await getCurrentTab();
    projects.forEach((project) => {
      if (project.sources[0]?.name === currentTab) {
        onSetProject(project);
        setIsProject(true);
        return;
      }
    });
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

  return (
    <>
      {!isProject ? (
        <div className="container flex-center">
          <div className="no-projects">
            <img src={info} alt="info" />
            <h2>No Webflow project found</h2>
            <p>Open this extension in the Webflow designer</p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="project-name">
            <span>{project.name}</span>
          </div>
          <div className="source-table">
            <div className="repository-single-item-wrapper is-grey">
              <span> Project URL: </span>
              <div className="column">
                <a
                  href={`https://devsites.hellowes.com/sites/${project.alias}`}
                  target="_blank"
                >
                  <span>
                    https://devsites.hellowes.com/sites/{project.alias}
                  </span>
                </a>
              </div>
            </div>
            <div className="repository-single-item-wrapper ">
              <span>Created: </span>
              <div className="column">
                <span>{new Date(project.created_at).toDateString()}</span>
              </div>
            </div>
            <div className="repository-single-item-wrapper is-grey">
              <span>Updated: </span>
              <div className="column">
                <span>{new Date(project.updated_at).toDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;

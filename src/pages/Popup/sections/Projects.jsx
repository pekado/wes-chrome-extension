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
          <div>
            <h2>No Webflow project found!</h2>
            <p>Open this extension in the Webflow designer</p>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="source-table">
            <div className="detail-row black">
              <div className="column flex-05">
                <span> Project Name: </span>
              </div>
              <div className="column ">
                <span>{project.name}</span>
              </div>
            </div>
            <div className="detail-row black">
              <div className="column flex-05">
                <span> Project URL: </span>
              </div>
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
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;

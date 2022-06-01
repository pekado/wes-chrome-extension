import React, { useEffect, useState } from 'react';
import './Popup.css';
import Spinner from '../../components/Spinner';
import Login from './sections/Login';
import Publish from './sections/Publish';
import Projects from './sections/Projects';
import JWTHelper from '../../util/JWTHelper';

const Popup = () => {
  let token;
  let totalAssets = 0;
  let currentImportingAsset = '';
  let assets = [];
  let user;
  const [project, setProject] = useState({});
  const [steps, setSteps] = useState('');
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    user = localStorage.getItem('access_token');
    if (user) {
      setSteps('PROJECTS');
      token = JSON.parse(user).access_token;
    } else {
      setSteps('LOGIN');
    }
    setStatus({
      loading: false,
      error: false,
    });
  }, []);

  const logout = () => {
    JWTHelper.deleteStoredToken();
    setSteps('LOGIN');
  };

  return (
    <>
      <div className="App">
        <div className="flex header">
          <h1>Wes</h1>
          {steps !== 'LOGIN' && (
            <a onClick={logout} className="login logout">
              logout
            </a>
          )}
        </div>
        {status.loading && <Spinner />}
        <>
          {steps === 'LOGIN' ? (
            <Login
              error={status.error}
              setSteps={setSteps}
              setStatus={setStatus}
            />
          ) : (
            <>
              {steps === 'PROJECTS' && (
                <>
                  <Projects
                    setProject={setProject}
                    project={project}
                    setStatus={setStatus}
                  />
                  {project.alias && (
                    <Publish
                      project={project}
                      error={status.error}
                      setSteps={setSteps}
                      setStatus={setStatus}
                      steps={steps}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Popup;

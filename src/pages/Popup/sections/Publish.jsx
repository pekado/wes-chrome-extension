import React, { useState } from 'react';
import ProjectAssetClient from '../../../clients/ProjectAssetClient';
import ProjectClient from '../../../clients/ProjectClient';

function Publish({ project, error, setSteps, setStatus }) {
  const assetClient = new ProjectAssetClient();
  const projectClient = new ProjectClient();
  const [isUpdated, setIsUpdated] = useState(false);

  const onPublish = async () => {
    projectClient
      .buildProject(project.id)
      .then((res) => {
        setStatus({
          loading: false,
          error: false,
        });
        setIsUpdated(true);
        console.log(res);
      })
      .catch((err) => {
        setStatus({
          loading: false,
          error: true,
        });
        console.error(err);
      });
  };

  const getAssets = async () => {
    setStatus({
      loading: true,
      error: false,
    });
    assetClient
      .getAssets(project.id)
      .then((assets) => {
        // import html assets only
        let htmlAssets = assets.filter((a) => {
          return a.type === 'html';
        });
        // console.log(htmlAssets);
        htmlAssets.forEach((asset) => {
          assetClient
            .updateAsset(28, asset.id, asset)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        });
      })
      .then(() => onPublish())
      .catch((err) => console.error(err));
    // const data = await res.json();
  };
  return (
    <div>
      {!isUpdated ? (
        <button onClick={getAssets}>Update project</button>
      ) : (
        <div className="login">
          <h3>Your site was updated!</h3>
          <a href={project.sources[0].url_homepage} target="_blank">
            <h3>{project.sources[0].url_homepage}</h3>
          </a>
        </div>
      )}
      {error && (
        <p className="error">Something went wrong, go back to Projects</p>
      )}
    </div>
  );
}

export default Publish;

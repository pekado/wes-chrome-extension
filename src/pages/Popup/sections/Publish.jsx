import React, { useState } from 'react';
import ProjectAssetClient from '../../../clients/ProjectAssetClient';
import ProjectClient from '../../../clients/ProjectClient';

function Publish({ project, error, setSteps, setStatus }) {
  const assetClient = new ProjectAssetClient();
  const projectClient = new ProjectClient();
  const [isUpdated, setIsUpdated] = useState(false);

  const onUpdate = async () => {
    let htmlAssets = [];
    setStatus({
      loading: true,
      error: false,
    });
    assetClient
      .getAssets(project.id)
      .then((assets) => {
        // import html assets only
        htmlAssets = assets.filter((a) => {
          return a.type === 'html';
        });
      })
      .then(() => {
        let assetPromise = htmlAssets.map((asset, i) => {
          assetClient.updateAsset(project.id, asset.id, asset);
        });
        Promise.all(assetPromise)
          .then(() => projectClient.buildProject(project.id))
          .then(() => {
            setTimeout(() => {
              setStatus({
                loading: false,
                error: false,
              });
              setIsUpdated(true);
            }, 7000);
          })
          .catch((err) => {
            setStatus({
              loading: false,
              error: true,
            });
            console.error(err);
          });
      });
    // const data = await res.json();
  };
  return (
    <div className="footer">
      {!isUpdated ? (
        <button onClick={onUpdate}>Update project</button>
      ) : (
        <div>
          <h3>Your site was updated!</h3>
          <a
            href={`https://devsites.hellowes.com/sites/${project.alias}`}
            target="_blank"
          >
            <h3>https://devsites.hellowes.com/sites/{project.alias}</h3>
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

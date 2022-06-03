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
            projectClient.getProject(project.alias).then((data) => {
              project.updated_at = data.updated_at;
            });
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
    <>
      {error && (
        <p className="error">Something went wrong, try again.</p>
      )}
      <div className="footer">
        {!isUpdated ? (
          <button onClick={onUpdate}>Update project</button>
        ) : (
          <div className="project-name">
            <span>Your site was updated!</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Publish;

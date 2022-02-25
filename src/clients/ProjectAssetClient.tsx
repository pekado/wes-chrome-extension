import { ProjectAsset, ProjectAssetVersion } from "../models/Project";
import BaseClient from "./BaseClient";

class ProjectAssetClient extends BaseClient {
  /**
   * Create new asset from the source url
   * @param projetId
   * @param params
   * @returns Promise<ProjectAsset>
   */
  createAsset = (projetId: number, params: {
    url_source: Array<string>,
    source_id: number
  }): Promise<ProjectAsset> => {
    return this.post(`/project/${projetId}/asset`, params);
  }

  /**
   * Update project asset
   * @param projectId
   * @param assetId
   * @param params
   * @returns Promise<ProjectAsset>
   */
  updateAsset = (projectId: number, assetId: number, params: ProjectAsset): Promise<ProjectAsset> => {
    return this.put(`/project/${projectId}/asset/${assetId}`, params);
  }

  /**
   * Delete project asset
   * @param projectId
   * @param assetId
   * @returns
   */
  deleteAsset = (projectId: number, assetId: number): Promise<any> => {
    return this.delete(`/project/${projectId}/asset/${assetId}`);
  }

  /**
   * get project assets
   * @param projectId
   * @returns
   */
  getAssets = (projectId: number): Promise<Array<ProjectAsset>> => {
    return this.get(`/project/${projectId}/asset`);
  }

  /**
   * get project assets
   * @param projectId
   * @returns
   */
  getAssetsForLokalise = (projectId: number, lang: string): Promise<Array<ProjectAsset>> => {
    return this.get(`/project/${projectId}/lokalise/assets`, { params: { lang } });
  }

  /**
   * get asset file content
   * @param projectId
   * @param assetId
   * @returns
   */
  getAsssetContent = (projectId: number, assetId: number): Promise<any> => {
    return this.get(`/project/${projectId}/asset/${assetId}/content`);
  }

  /**
   * get asset versions
   * @param projectId
   * @param assetId
   * @returns
   */
  getAssetVersions = (projectId: number, assetId: number): Promise<ProjectAssetVersion> => {
    return this.get(`/project/${projectId}/asset/${assetId}/versions`);
  }

  /**
   * Get asset images
   * @param projectId
   * @returns
   */
  getAssetImages = (projectId: number): Promise<Array<string>> => {
    return this.get(`/project/${projectId}/asset/images`);
  }

  /**
   * import asset images
   * @param projectId
   * @returns
   */
  importImages = (projectId: number, data: Array<string>): Promise<Array<string>> => {
    return this.post(`/project/${projectId}/asset/images`, { images: data });
  }

  deleteVersion = (versionId: number): Promise<any> => {
    return this.delete(`/version/${versionId}`);
  }

  setActiveVersion = (versionId: number): Promise<any> => {
    return this.post(`/version/${versionId}/set/active`, []);
  }

  /**
   * Upload file to Lokalise then Translate
   * @param projectId 
   * @param assetId 
   * @param lang 
   * @returns 
   */
  uploadFileToLokalise = (projectId: number, assetId: number, lang: string): Promise<any> => {
    return this.post(`/project/${projectId}/asset/${assetId}/lokalise/upload`, { lang: lang });
  }
}

export default ProjectAssetClient;

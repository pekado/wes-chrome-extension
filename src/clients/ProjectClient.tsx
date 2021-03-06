import { Project} from '../models/Project';
import BaseClient from './BaseClient';

class ProjectClient extends BaseClient {
  /**
   * get all the projects
   * @param params
   * @returns Promise<Paginator<Project>>
   */
  getAllProjects = (params?: {
    search?: string;
    limit?: number;
    sort_by?: string;
    order?: string;
    page?: number;
  }): Promise<Project> => {
    return this.get('/project', { params });
  };
  /**
   * get project detail
   * @param alias
   * @returns
   */
  getProject = (alias: string): Promise<Project> => {
    return this.get(`/project/${alias}`);
  };

  /**
   * Create project build
   * @param id
   * @returns
   */
  buildProject = (id: number): Promise<any> => {
    return this.post(`/project/${id}/build`, []);
  };
}

export default ProjectClient;

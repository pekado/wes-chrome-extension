export interface Project {
  id?: number,
  name: string,
  alias: string
  stage_url?: string
  thumbnail?: string,
  sources?: Array<ProjectSource>,
  style?: string,
  is_dirty?: boolean,
  is_publishing?: boolean,
  is_published?: boolean,
  publish_percent?: number,
  created_at?: string,
  updated_at?: string,
  data?: any
}

export interface ProjectSource {
  id?: number,
  project_id?: number,
  name: string,
  domain: string,
  url_homepage: string,
  url_sitemap?: string,
  is_added?: boolean,
  created_at?: string,
  updated_at?: string
}

export interface ProjectAsset {
  id?: number,
  project_id?: number,
  source_id: number,
  path?: string,
  type?: string,
  url_source: string,
  matrix_source?: string,
  matrix_tag?: string,
  str_search?: string,
  is_nocache?: boolean,
  lastimport?: string,
  is_active?: boolean,
  created_at?: string,
  updated_at?: string,
  deep?: number,
  loading?: boolean
}

export interface ProjectAssetVersion {
  id?: number,
  project_id?: number,
  asset_id?: number,
  url_source: string,
  content_url?: string,
  lastimport?: string,
  is_active?: boolean,
  created_at?: string,
  updated_at?: string,
}

export interface ProjectAwsSetting {
  key: string,
  secret: string,
  region: string,
  bucket: string,
  url: string
}
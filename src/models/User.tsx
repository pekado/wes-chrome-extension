// User access_token, use for access the API
export interface UserToken {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  token_type: string
}

export interface User {
  id?: number,
  name: string,
  email?: string,
  mobile?: string,
  email_verified_at?: string
  avatar?: string
}

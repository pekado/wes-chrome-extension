import jwtDecode from 'jwt-decode';

interface JWTDetail {
  aud: string, // the client id used to generate the access token
  jti: string, // the actual token saved in the database
  exp: number, // timestamp of when the token will expire
  sub: string, // the user_id of the token owner
  scopes: Array<string> // the scope of the token, this will show the limitation of the user
}

interface UserToken {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  token_type: string
}


class JWTHelper {

  token: UserToken | null = null;

  constructor() {
    let t: UserToken = JSON.parse(localStorage.getItem("access_token")!);
    this.token = t;
  }

  /**
   * Save new token to the device storage then replace our current UserToken
   * @param token
   */
  storeToken = async (token: UserToken) => {
    this.token = token;
    localStorage.setItem("access_token", JSON.stringify(token));
  }

  /**
   * delete stored token and logout user
   */
  deleteStoredToken = async () => {
    localStorage.removeItem("access_token");
    this.token = null;
  }

  // get the current access token
  getToken = (): UserToken => {
    return this.token!;
  }

  getAccessToken = (): string => {
    let accessToken = this.token ? this.token.access_token : "";
    return accessToken;
  }

  // get JWT parsed token
  getDecodedToken = (): JWTDetail => {
    return jwtDecode<JWTDetail>(this.token?.access_token!);
  }

  /**
   * Check if the token is expired or not
   * @returns boolean
   */
  isExpired = () => {
    return this.getDecodedToken().exp > (Date.now() / 1000);
  }

  /**
   * check if there is current user login
   * @returns
   */
  isLogin = (): boolean => {
    return this.token !== null && this.token !== undefined;
  }

  getUserId = (): string => {
    return this.getDecodedToken().sub;
  }

}

// make sure this is a global object
export default new JWTHelper();

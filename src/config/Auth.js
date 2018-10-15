import auth0 from 'auth0-js';

const authentication = new auth0.WebAuth({
  domain: 'slohacks.auth0.com',
  clientID: '0zCW2SzwkkSYNsKFY9jyec3lWaaMFnO2',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'token id_token',
  scope: 'read:application',
  audience: 'https://application-system/api',
});

export default authentication;

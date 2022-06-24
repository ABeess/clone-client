import feathers from '@feathersjs/feathers';
const app = feathers();
import rest from '@feathersjs/rest-client';
import authentication, { MemoryStorage } from '@feathersjs/authentication-client';
import axiosInstance from './axios';
const restClient = rest(process.env.HOST_API_KEY);

class MyAuthenticationClient extends authentication.AuthenticationClient {
  async getAccessToken() {
    // return (
    //   super.getAccessToken() || JSON.parse(localStorage.getItem('recoil-persist'))?.authentication?.accessToken || ''
    // );
    const accessToken =
      (await super.getAccessToken()) ||
      (await JSON.parse(localStorage.getItem('recoil-persist'))?.authentication?.accessToken) ||
      '';
    console.log('getAccessToken :: accessToken', accessToken);
    return accessToken;
  }
}

app.configure(restClient.axios(axiosInstance));
app.configure(
  authentication({
    storageKey: 'accessToken',
    storage: new MemoryStorage(),

    Authentication: MyAuthenticationClient,
  })
);

export default app;

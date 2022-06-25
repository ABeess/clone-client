import feathers from '@feathersjs/feathers';
const app = feathers();
import rest from '@feathersjs/rest-client';
import authentication, { MemoryStorage } from '@feathersjs/authentication-client';
import axiosInstance from './axios';
const restClient = rest(process.env.HOST_API_KEY);

class MyAuthenticationClient extends authentication.AuthenticationClient {
  async getAccessToken() {
<<<<<<< HEAD
    return JSON.parse(localStorage.getItem('recoil-persist'))?.authentication?.accessToken || 'a';
=======
    return JSON.parse(localStorage.getItem('recoil-persist'))?.authentication?.accessToken || '';
>>>>>>> 9310d36e77a2eabd0856cdc43a509950da145eaa
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

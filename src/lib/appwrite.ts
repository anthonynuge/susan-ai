import { Client, Account, Avatars } from 'appwrite';

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const avatars = new Avatars(client);

export { account, avatars };

// export const account = new Account(client);

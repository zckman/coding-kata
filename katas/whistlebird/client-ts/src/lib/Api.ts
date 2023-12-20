import type {Posts, UserAuth, Whistle} from "$lib/ApiResults";

export default class Api {

  static readonly BASE_URL = "https://whistlebird.vercel.app"

  static async fetchData(url: string) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async getPosts(): Promise<Posts> {
    return (await this.fetchData(this.BASE_URL + "/posts"))['data']
  }

  static async postWhistle(whistle: Whistle) {
    try {
      const response = await fetch(this.BASE_URL + '/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(whistle.token ? { 'token': whistle.token} : {})
        },
        body: JSON.stringify({ message: whistle.message }),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async register(auth: UserAuth) {
    try {
      const response = await fetch(this.BASE_URL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async token(auth: UserAuth) {
    try {
      const response = await fetch(this.BASE_URL + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      });

      return (await response.json())['data']['token'];
    } catch (error) {
      console.error(error);
    }
  }
}
